export class PriorityQueue {
    constructor() {
        this.queue = [];
    }

    addProcess(process, priority) {
        this.queue.push({ process, priority });
        this.queue.sort((a, b) => a.priority - b.priority);
    }

    getNextProcess() {
        if (this.queue.length > 0) {
            return this.queue.shift().process;
        }
        return null;
    }

    isEmpty() {
        return this.queue.length === 0;
    }
}
