import { FCFS } from './FCFS.js';
import { RoundRobin } from './RoundRobin.js';
import { SJF } from './SJF.js';
import { MFQ } from './MFQ.js';
import { Process } from './Process.js';

export class SystemOS {
    constructor() {
        this.scheduler = null;
        this.processes = [];
    }

    setScheduler(schedulerType, options = {}) {
        switch (schedulerType.toLowerCase()) {
            case 'fcfs':
                this.scheduler = new FCFS();
                break;
            case 'roundrobin':
                this.scheduler = new RoundRobin(options.quantum || 2); // Default quantum of 2
                break;
            case 'sjf':
                this.scheduler = new SJF();
                break;
            case 'mfq':
                this.scheduler = new MFQ(options.levels || 3); // Default 3 levels for MFQ
                break;
            default:
                throw new Error('Tipo de scheduler no soportado');
        }
    }

    addProcess(id, burstTime, priority, arrivalTime = 0) {
        const process = new Process(id, burstTime, priority, arrivalTime);
        this.processes.push(process);
        this.scheduler.addProcess(process);
    }

    run() {
        if (!this.scheduler) {
            throw new Error('No se ha establecido un scheduler');
        }
        this.scheduler.schedule();
    }

    getLogs() {
        return this.processes.map(process => process.getLogs()).join('\n\n');
    }
}
