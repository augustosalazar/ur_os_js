import { ProcessState } from './ProcessState.js';

export class Process {
    constructor(id, burstTime, priority, arrivalTime = 0) {
        this.id = id;
        this.state = ProcessState.NEW;
        this.burstTime = burstTime;
        this.priority = priority;
        this.remainingTime = burstTime;
        this.arrivalTime = arrivalTime;
        this.startTime = null;
        this.finishTime = null;
        this.logs = [];
    }

    log(message) {
        this.logs.push(`Proceso ${this.id}: ${message}`);
        console.log(`Proceso ${this.id}: ${message}`);
    }

    run(currentTime, quantum = null) {
        this.log(`Estado inicial: ${this.state}`);
        this.state = ProcessState.RUNNING;
        
        // Establecer el tiempo de inicio si aún no ha sido definido
        if (this.startTime === null) {
            this.startTime = currentTime;
        }

        if (quantum !== null && this.remainingTime > quantum) {
            this.log(`Ejecutándose por ${quantum} unidades de tiempo`);
            this.remainingTime -= quantum;
            this.log(`Tiempo restante: ${this.remainingTime}`);
            this.state = ProcessState.READY;
            this.log(`Cambio de estado a: ${this.state}`);
        } else {
            this.log(`Ejecutándose por ${this.remainingTime} unidades de tiempo`);
            currentTime += this.remainingTime;
            this.remainingTime = 0;
            this.finishTime = currentTime;
            this.state = ProcessState.TERMINATED;
            this.log(`Proceso completado y cambio de estado a: ${this.state}`);
            this.log(`Tiempo de inicio: ${this.startTime}, Tiempo de finalización: ${this.finishTime}`);
        }
    }

    getLogs() {
        return this.logs.join('\n');
    }
}
