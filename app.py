from flask import Flask, render_template

app = Flask(__name__, static_folder='static')  # Specify the static folder

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)




# import os
# from flask import Flask, request, jsonify
# from tensorflow.keras.models import load_model
# from tensorflow.keras.preprocessing import image
# import numpy as np

# app = Flask(__name__)

# # Load the pre-trained model
# model = load_model('ai_model.h5')

# # Function to preprocess the uploaded image
# def preprocess_image(img_path):
#     img = image.load_img(img_path, target_size=(224, 224))
#     img_array = image.img_to_array(img)
#     img_array = np.expand_dims(img_array, axis=0)
#     img_array /= 255.0  # Normalize pixel values
#     return img_array

# # Route to handle image prediction
# @app.route('/predict', methods=['POST'])
# def predict():
#     if 'image' not in request.files:
#         return jsonify({'error': 'No image uploaded'})

#     img = request.files['image']
#     img_path = os.path.join('uploads', img.filename)
#     img.save(img_path)

#     processed_img = preprocess_image(img_path)
#     prediction = model.predict(processed_img)

#     # Assuming prediction[0][0] is the probability for AI-generated image
#     ai_probability = prediction[0][0]
#     label = 'AI-generated' if ai_probability >= 0.5 else 'Real'

#     os.remove(img_path)  # Remove the uploaded image

#     return jsonify({'probability': float(ai_probability), 'label': label})

# if __name__ == '__main__':
#     app.run(debug=True)
