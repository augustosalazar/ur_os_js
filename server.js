import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { FCFS } from './modules/FCFS.js';
import { RoundRobin } from './modules/RoundRobin.js';
import { SJF } from './modules/SJF.js';
import { MFQ } from './modules/MFQ.js';
import { OS } from './modules/OS.js';
import { Process } from './modules/Process.js';

const app = express();
const port = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/run-simulation', (req, res) => {
    const algorithm = req.query.algorithm || 'fcfs';
    let scheduler;

    switch (algorithm.toLowerCase()) {
        case 'roundrobin':
            scheduler = new RoundRobin(2);  // Quantum de 2 unidades
            break;
        case 'sjf':
            scheduler = new SJF();
            break;
        case 'mfq':
            scheduler = new MFQ(3);  // 3 niveles de colas
            break;
        case 'fcfs':
        default:
            scheduler = new FCFS();
            break;
    }

    const os = new OS(scheduler);

    const process1 = new Process(1, 5);
    const process2 = new Process(2, 3);

    os.addProcess(process1);
    os.addProcess(process2);

    os.run();

    res.json({ output: os.getLogs() });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
