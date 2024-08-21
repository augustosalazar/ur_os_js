export class Scheduler {
    constructor() {
        this.queue = [];
    }

    addProcess(process) {
        this.queue.push(process);
    }

    schedule() {
        // Implementación del algoritmo de planificación
        console.log("Planificando procesos...");
    }
}
