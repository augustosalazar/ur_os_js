export class Scheduler {
    constructor() {
        this.queue = []; // Array to store the processes
    }

    addProcess(process) {
        this.queue.push(process); // Add a process to the queue
        console.log(`Proceso ${process.id} añadido a la cola`); // Log the addition of a process
    }

    schedule() {
        throw new Error('El método schedule() debe ser implementado por subclases'); // Abstract method
    }
}
