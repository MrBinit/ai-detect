document.addEventListener('DOMContentLoaded', () => {
    const uploadContainer = document.getElementById('uploadContainer');
    const loader = document.getElementById('loader');
    const loaderBar = document.getElementById('loaderBar');
    const resultContainer = document.getElementById('resultContainer');
    const predictionText = document.getElementById('predictionText');
    const predictionBarFill = document.getElementById('predictionBarFill');
    const predictionProb = document.getElementById('predictionProb');

    uploadContainer.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadContainer.classList.add('highlight');
    });

    uploadContainer.addEventListener('dragleave', () => {
        uploadContainer.classList.remove('highlight');
    });

    uploadContainer.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadContainer.classList.remove('highlight');

        const file = e.dataTransfer.files[0];
        processImage(file);
    });

    document.getElementById('imageUpload').addEventListener('change', (e) => {
        const file = e.target.files[0];
        processImage(file);
    });

    function processImage(file) {
        if (file) {
            showLoader();

            // Simulate image processing (replace with actual model prediction)
            setTimeout(() => {
                const isAI = Math.random() < 0.5; // Randomly generate AI or real image

                hideLoader();

                if (isAI) {
                    displayResult('AI-Generated', 0.8); // Example: AI image with 80% probability
                } else {
                    displayResult('Real Image', 0.3); // Example: Real image with 30% probability
                }
            }, 2000); // Simulate 2-second processing time
        }
    }

    function showLoader() {
        loader.style.display = 'block';
        resultContainer.style.display = 'none';
    }

    function hideLoader() {
        loader.style.display = 'none';
        resultContainer.style.display = 'block';
    }

    function displayResult(label, probability) {
        predictionText.textContent = `Prediction: ${label}`;
        predictionProb.textContent = `Probability: ${(probability * 100).toFixed(2)}%`;
        predictionBarFill.style.width = `${probability * 100}%`;
    }
});
