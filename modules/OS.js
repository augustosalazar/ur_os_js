import { Scheduler } from './Scheduler.js';
import { IOQueue } from './IOQueue.js';
import { Process } from './Process.js';

export class OS {
    constructor(scheduler) {
        this.scheduler = scheduler;
        this.ioQueue = new IOQueue();
        this.processes = [];
    }

    addProcess(process) {
        this.processes.push(process);
        this.scheduler.addProcess(process);
    }

    handleIO() {
        const process = this.ioQueue.processIO();
        if (process) {
            this.scheduler.addProcess(process);
        }
    }

    run() {
        this.scheduler.schedule();
        this.handleIO();
    }

    getLogs() {
        const logs = this.processes.map(process => process.getLogs());
        return logs.join('\n\n');
    }
}
