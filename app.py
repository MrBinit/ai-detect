import os
from flask import Flask, request, jsonify, render_template
import tensorflow as tf
from tensorflow.keras.preprocessing import image
from tensorflow.keras.applications.efficientnet import preprocess_input

app = Flask(__name__)

# path to the SavedModel directory
model_path = '/Users/mrbinit/Desktop/AI detect/saved_model 2'

# Load the SavedModel using tf.saved_model.load
model = tf.saved_model.load(model_path)

# Function to preprocess the uploaded image
def preprocess_image(file_path, image_size=(380, 380)):
    img = tf.io.read_file(file_path)
    img = tf.image.decode_jpeg(img, channels=3)  # Ensure 3 channels (RGB)
    img = tf.image.resize(img, image_size)
    img = preprocess_input(img)
    img = tf.expand_dims(img, axis=0)  # Add batch dimension
    return img

# Route to handle index page and image prediction
@app.route('/', methods=['GET', 'POST'])
def index():
    if request.method == 'GET':
        return render_template('index.html', prediction=None)

    if request.method == 'POST':
        if 'image' not in request.files:
            return jsonify({'error': 'No image uploaded'})

        # Save the uploaded image to a temporary file
        img = request.files['image']
        img_path = 'temp.jpg'
        img.save(img_path)

        # Preprocess the uploaded image
        processed_img = preprocess_image(img_path)

        # Make prediction using the loaded model
        prediction = model(processed_img)  # Assuming the model outputs a single scalar value
        probability_real = tf.sigmoid(prediction).numpy()  # Apply sigmoid to get probability
        probability_fake = 1.0 - probability_real  # Calculate probability for "AI-generated"

        # Remove the temporary uploaded image
        os.remove(img_path)

        # Return prediction result to the template
        return render_template('index.html', prediction={
            'probability_real': float(probability_real),
            'probability_fake': float(probability_fake)
        })

if __name__ == '__main__':
    app.run(debug=True)
