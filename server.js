import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { FCFS } from './modules/FCFS.js';
import { RoundRobin } from './modules/RoundRobin.js';
import { SJF } from './modules/SJF.js';
import { MFQ } from './modules/MFQ.js';
import { SystemOS } from './modules/SystemOS.js';
import { Process } from './modules/Process.js';

const app = express();
const port = 8080;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

app.post('/run-simulation', (req, res) => {
    const { algorithm, processes } = req.body;

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

    const systemOS = new SystemOS();

    processes.forEach((process, index) => {
        const newProcess = new Process(index + 1, process.burstTime);
        systemOS.addProcess(newProcess);
    });

    systemOS.run();

    res.json({ output: systemOS.getLogs() });
});

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.listen(port, () => {
    console.log(`Servidor ejecutándose en http://localhost:${port}`);
});
