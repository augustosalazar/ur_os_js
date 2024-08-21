import { ProcessState } from './ProcessState.js';
import { ProcessBurstList } from './ProcessBurstList.js';

export class Process {
    constructor(id, burstTime) {
        this.id = id;
        this.state = ProcessState.NEW;
        this.burstTime = burstTime;
        this.burstList = new ProcessBurstList();
    }

    run(quantum = null) {
        console.log(`Proceso ${this.id} en estado ${this.state}`);
        this.state = ProcessState.RUNNING;

        if (quantum !== null && this.burstTime > quantum) {
            console.log(`Proceso ${this.id} ejecutándose por ${quantum} unidades de tiempo`);
            this.burstTime -= quantum;
            this.state = ProcessState.READY;
        } else {
            console.log(`Proceso ${this.id} completado`);
            this.state = ProcessState.TERMINATED;
        }
    }
}
