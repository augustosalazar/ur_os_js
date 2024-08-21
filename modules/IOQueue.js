import { ProcessState } from './ProcessState.js';

export class IOQueue {
    constructor() {
        this.queue = [];
        this.logs = [];
    }

    log(message) {
        this.logs.push(message);
    }

    addProcess(process) {
        this.queue.push(process);
    }

    processIO() {
        if (this.queue.length > 0) {
            const process = this.queue.shift();
            this.log(`Procesando IO para el proceso ${process.id}`);
            process.state = ProcessState.READY;
            return process;
        }
        return null;
    }

    getLogs() {
        return this.logs.join('\n');
    }
}
