# Fake vs Real Image Classifier

This project involves building a deep learning model to classify images as either fake or real. The dataset consists of images categorized into two classes: 'fake' and 'real'. The model is trained using TensorFlow and employs transfer learning with the EfficientNetB4 architecture pre-trained on ImageNet.

## Dataset
This dataset is from Kaggle. The dataset is organized into a main folder structure with subfolders for each class ('fake' and 'real'). Images are preprocessed and loaded using TensorFlow. The class distribution and percentages are analyzed to understand the dataset.

## Data Preprocessing
Images are preprocessed using TensorFlow's data preprocessing utilities. This includes resizing, augmentation (for the training set), and normalization using EfficientNet preprocessing.

## Model Architecture
The classification model is built on top of the EfficientNetB4 base model with additional layers for global average pooling, dropout regularization, and a dense output layer with sigmoid activation for binary classification.

## Training
The model is trained using transfer learning with the base layers of EfficientNetB4 frozen initially. After an initial training phase, the last 20 layers are unfrozen for fine-tuning with a lower learning rate. The training process includes monitoring validation loss and reducing learning rate on plateau.

## Evaluation
The trained model is evaluated on a separate test dataset to assess its performance. Metrics such as loss and accuracy are computed. Additionally, a confusion matrix, classification report, precision, recall, and F1 score are generated for further evaluation.

## Results Visualization
Confusion matrix and ROC curve are plotted to visualize the performance of the model on the test dataset.

## Web Application for Image Prediction
The project also includes a Flask web application for predicting whether an uploaded image is real or fake. The application loads a trained model and preprocesses the uploaded image before making predictions. The prediction result, including probabilities for real and fake, is displayed on the web interface.

## Dependencies
- TensorFlow
- OpenCV (cv2)
- Matplotlib
- NumPy
- Pandas
- Scikit-learn
- Seaborn
- Flask

## How to Use
1. Ensure all dependencies are installed.
2. Organize your image dataset into folders according to class labels ('fake' and 'real').
3. Update the `base_path` variable in the main script to point to the main folder containing the dataset.
4. Run the Flask application to deploy the image classifier web interface.

## Notes
- Adjust hyperparameters, such as batch size and number of epochs, as needed for your dataset and computing resources.
- Fine-tuning the model may require experimentation with the number of unfrozen layers and learning rates for optimal performance.
- This README provides an overview; refer to inline comments in the script for detailed explanations of each step.
