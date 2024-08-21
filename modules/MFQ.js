import { PriorityQueue } from './PriorityQueue.js';

export class MFQ {
    constructor(levels) {
        this.queues = [];
        for (let i = 0; i < levels; i++) {
            this.queues.push(new PriorityQueue());
        }
    }

    addProcess(process, priority = 0) {
        this.queues[priority].addProcess(process, priority);
    }

    schedule() {
        for (let i = 0; i < this.queues.length; i++) {
            while (!this.queues[i].isEmpty()) {
                const process = this.queues[i].getNextProcess();
                process.run();

                // Lógica para mover el proceso a otra cola si no se termina
                if (process.state !== 'TERMINATED') {
                    const newPriority = Math.min(i + 1, this.queues.length - 1);
                    this.queues[newPriority].addProcess(process, newPriority);
                }
            }
        }
    }

    getLogs() {
        return this.queues.map((queue, index) => 
            `Queue ${index} Logs:\n${queue.queue.map(item => item.process.getLogs()).join('\n\n')}`
        ).join('\n\n');
    }
}
