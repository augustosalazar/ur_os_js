import { InterruptType } from './InterruptType.js';
import { Process } from './Process.js';

export class SystemOS {
    constructor() {
        this.interruptQueue = [];
        this.processes = [];
        this.logs = [];
    }

    log(message) {
        this.logs.push(message);
    }

    addProcess(process) {
        this.processes.push(process);
    }

    handleInterrupt(type) {
        this.interruptQueue.push(type);
        this.log(`Interrupción de tipo ${type} manejada`);
    }

    run() {
        while (this.processes.length > 0) {
            const process = this.processes.shift();
            process.run();
            this.log(process.getLogs());
            if (process.state !== 'TERMINATED') {
                this.processes.push(process);
            }

            if (this.interruptQueue.length > 0) {
                const interrupt = this.interruptQueue.shift();
                this.handleInterrupt(interrupt);
            }
        }
    }

    getLogs() {
        return this.logs.join('\n');
    }
}
