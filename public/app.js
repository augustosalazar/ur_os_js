let processCounter = 1;

document.getElementById('add-process').addEventListener('click', () => {
    addProcessToUI();
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
    runSimulation();
});

document.getElementById('clear-output').addEventListener('click', () => {
    document.getElementById('output').innerText = '';
    document.getElementById('processes-container').innerHTML = '';
    processCounter = 1;
});

document.getElementById('add-sample-processes').addEventListener('click', () => {
    document.getElementById('clear-output').click();  // Limpia la salida y reinicia los procesos

    // Agregar los 4 procesos del escenario de prueba
    addProcessToUI(0, 8, 1);
    addProcessToUI(1, 4, 2);
    addProcessToUI(2, 9, 1);
    addProcessToUI(3, 5, 3);

    runSimulation();
});

function addProcessToUI(arrivalTime = 0, burstTime = 5, priority = 1) {
    const processContainer = document.getElementById('processes-container');
    const processDiv = document.createElement('div');
    processDiv.className = 'process';
    processDiv.innerHTML = `
        <h3>Proceso ${processCounter}</h3>
        <label for="arrivalTime-${processCounter}">Arrival Time:</label>
        <input type="number" id="arrivalTime-${processCounter}" value="${arrivalTime}" min="0">
        <label for="burstTime-${processCounter}">Burst Time:</label>
        <input type="number" id="burstTime-${processCounter}" value="${burstTime}" min="1">
        <label for="priority-${processCounter}">Prioridad:</label>
        <input type="number" id="priority-${processCounter}" value="${priority}" min="1">
        <button class="remove-process">Eliminar Proceso</button>
    `;
    processContainer.appendChild(processDiv);

    processDiv.querySelector('.remove-process').addEventListener('click', () => {
        processDiv.remove();
    });

    processCounter++;
}

function runSimulation() {
    document.getElementById('output').innerText = '';

    const algorithm = document.getElementById('algorithm').value;
    const quantum = document.getElementById('quantum').value;
    const mfqLevels = document.getElementById('mfq-levels').value;
    const processes = [];

    document.querySelectorAll('.process').forEach((processDiv, index) => {
        const arrivalTimeElement = processDiv.querySelector(`#arrivalTime-${index + 1}`);
        const burstTimeElement = processDiv.querySelector(`#burstTime-${index + 1}`);
        const priorityElement = processDiv.querySelector(`#priority-${index + 1}`);

        if (arrivalTimeElement && burstTimeElement && priorityElement) {
            const arrivalTime = parseInt(arrivalTimeElement.value);
            const burstTime = parseInt(burstTimeElement.value);
            const priority = parseInt(priorityElement.value);
            processes.push({ arrivalTime, burstTime, priority });
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
}
