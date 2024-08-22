export class Process {
    constructor(id, burstTime, priority) {
        this.id = id;
        this.burstTime = burstTime;
        this.priority = priority;
        this.remainingTime = burstTime;
        this.logs = []; // Array to store logs for each process
    }

    log(message) {
        this.logs.push(`Proceso ${this.id}: ${message}`);
        console.log(`Proceso ${this.id}: ${message}`); // Also log to the console for debugging
    }

    run(quantum) {
        this.log(`Estado inicial: RUNNING`);
        if (this.remainingTime > quantum) {
            this.log(`Ejecutándose por ${quantum} unidades de tiempo`);
            this.remainingTime -= quantum;
            this.log(`Tiempo restante: ${this.remainingTime}`);
            this.log(`Cambio de estado a: READY`);
        } else {
            this.log(`Ejecutándose por ${this.remainingTime} unidades de tiempo`);
            this.remainingTime = 0;
            this.log(`Proceso completado y cambio de estado a: TERMINATED`);
        }
    }

    getRemainingTime() {
        return this.remainingTime;
    }

    getLogs() {
        return this.logs.join('\n'); // Join all log entries into a single string
    }
}
