document.addEventListener("DOMContentLoaded", () => {
    const dropZone = document.getElementById("dropZone");
    const loader = document.getElementById("loader");
    const resultDiv = document.getElementById("result");

    dropZone.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropZone.classList.add("drag-over");
    });

    dropZone.addEventListener("dragleave", () => {
        dropZone.classList.remove("drag-over");
    });

    dropZone.addEventListener("drop", (e) => {
        e.preventDefault();
        dropZone.classList.remove("drag-over");

        const file = e.dataTransfer.files[0];
        if (file) {
            loadImage(file);
        }
    });

    const fileInput = document.getElementById("fileInput");
    fileInput.addEventListener("change", () => {
        const file = fileInput.files[0];
        if (file) {
            loadImage(file);
        }
    });

    function loadImage(file) {
        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.src = e.target.result;
            img.onload = () => {
                predictImage(img);
            };
        };
        reader.readAsDataURL(file);
    }

    function predictImage(img) {
        loader.style.display = "block";
        resultDiv.textContent = "";

        // Send the image data to the backend for prediction
        const formData = new FormData();
        formData.append("image", img);

        fetch("/predict", {
            method: "POST",
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            loader.style.display = "none";
            resultDiv.textContent = `Probability: ${data.probability.toFixed(2)} (${data.label})`;
        })
        .catch(error => {
            loader.style.display = "none";
            resultDiv.textContent = "Error predicting image.";
        });
    }
});













// import os
// from flask import Flask, request, jsonify
// from tensorflow.keras.models import load_model
// from tensorflow.keras.preprocessing import image
// import numpy as np

// app = Flask(__name__)

// # Load the pre-trained model
// model = load_model('ai_model.h5')

// # Function to preprocess the uploaded image
// def preprocess_image(img_path):
//     img = image.load_img(img_path, target_size=(224, 224))
//     img_array = image.img_to_array(img)
//     img_array = np.expand_dims(img_array, axis=0)
//     img_array /= 255.0  # Normalize pixel values
//     return img_array

// # Route to handle image prediction
// @app.route('/predict', methods=['POST'])
// def predict():
//     if 'image' not in request.files:
//         return jsonify({'error': 'No image uploaded'})

//     img = request.files['image']
//     img_path = os.path.join('uploads', img.filename)
//     img.save(img_path)

//     processed_img = preprocess_image(img_path)
//     prediction = model.predict(processed_img)

//     # Assuming prediction[0][0] is the probability for AI-generated image
//     ai_probability = prediction[0][0]
//     label = 'AI-generated' if ai_probability >= 0.5 else 'Real'

//     os.remove(img_path)  # Remove the uploaded image

//     return jsonify({'probability': float(ai_probability), 'label': label})

// if __name__ == '__main__':
//     app.run(debug=True)
