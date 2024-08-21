export class CPU {
    constructor() {
        this.processes = [];
    }

    addProcess(process) {
        this.processes.push(process);
    }

    execute() {
        // Logic for CPU execution
        this.processes.forEach(process => process.run());
    }
}
