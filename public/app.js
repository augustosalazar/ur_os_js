let processCounter = 1;

document.getElementById('add-process').addEventListener('click', () => {
    const processContainer = document.getElementById('processes-container');
    const processDiv = document.createElement('div');
    processDiv.className = 'process';
    processDiv.innerHTML = `
        <h3>Proceso ${processCounter}</h3>
        <label for="burstTime-${processCounter}">Burst Time:</label>
        <input type="number" id="burstTime-${processCounter}" value="5" min="1">
        <label for="priority-${processCounter}">Prioridad:</label>
        <input type="number" id="priority-${processCounter}" value="1" min="1">
        <button class="remove-process">Eliminar Proceso</button>
    `;
    processContainer.appendChild(processDiv);

    processDiv.querySelector('.remove-process').addEventListener('click', () => {
        processDiv.remove();
    });

    processCounter++;
});

document.getElementById('algorithm').addEventListener('change', () => {
    const algorithm = document.getElementById('algorithm').value;

    document.getElementById('quantum-container').style.display = 'none';
    document.getElementById('mfq-levels-container').style.display = 'none';

    if (algorithm === 'roundrobin') {
        document.getElementById('quantum-container').style.display = 'block';
    } else if (algorithm === 'mfq') {
        document.getElementById('mfq-levels-container').style.display = 'block';
    }
});

document.getElementById('run-simulation').addEventListener('click', () => {
    const algorithm = document.getElementById('algorithm').value;
    const quantum = document.getElementById('quantum').value;
    const mfqLevels = document.getElementById('mfq-levels').value;
    const processes = [];

    document.querySelectorAll('.process').forEach((processDiv, index) => {
        const burstTimeElement = processDiv.querySelector(`#burstTime-${index + 1}`);
        const priorityElement = processDiv.querySelector(`#priority-${index + 1}`);

        if (burstTimeElement && priorityElement) {
            const burstTime = burstTimeElement.value;
            const priority = priorityElement.value;
            processes.push({ burstTime: parseInt(burstTime), priority: parseInt(priority) });
        }
    });

    const data = {
        algorithm,
        processes,
        quantum: parseInt(quantum),
        mfqLevels: parseInt(mfqLevels)
    };

    fetch('/run-simulation', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('output').innerText = data.output;
    })
    .catch(error => console.error('Error:', error));
});
