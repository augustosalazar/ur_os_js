import { ProcessState } from './ProcessState.js';

export class IOQueue {
    constructor() {
        this.queue = [];
    }

    addProcess(process) {
        this.queue.push(process);
    }

    processIO() {
        if (this.queue.length > 0) {
            const process = this.queue.shift();
            console.log(`Procesando IO para el proceso ${process.id}`);
            process.state = ProcessState.READY;
            return process;
        }
        return null;
    }
}
