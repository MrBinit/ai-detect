document.getElementById('imageInput').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const formData = new FormData();
        formData.append('image', file);

        const xhr = new XMLHttpRequest();
        xhr.open('POST', '/predict', true);

        xhr.upload.onprogress = function(e) {
            document.getElementById('loader').style.display = 'block';
        };

        xhr.onload = function() {
            if (xhr.status === 200) {
                const response = JSON.parse(xhr.responseText);
                document.getElementById('loader').style.display = 'none';
                document.getElementById('result').style.display = 'block';
                document.getElementById('result').textContent = `AI Probability: ${response.probability.toFixed(2)}`;
                // You can add visualization of probability here
            }
        };

        xhr.send(formData);
    }
});
