document.getElementById('run-simulation').addEventListener('click', () => {
    const algorithm = document.getElementById('algorithm').value;
    fetch(`/run-simulation?algorithm=${algorithm}`)
        .then(response => response.json())
        .then(data => {
            document.getElementById('output').innerText = data.output;
        })
        .catch(error => console.error('Error:', error));
});
