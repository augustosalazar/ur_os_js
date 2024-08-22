import { SystemOS } from './modules/SystemOS.js';

// Function to run the simulation
function runSimulation() {
    // Get the scheduler type, quantum, and levels from command line arguments or use defaults
    const schedulerType = process.argv[2] || 'roundrobin';
    const quantum = parseInt(process.argv[3]) || 3; // Default quantum is 3 for RoundRobin
    const levels = parseInt(process.argv[4]) || 3; // Default levels is 3 for MFQ

    // Log the parameters before execution
    console.log("Parameters for simulation:");
    console.log(`Scheduler Type: ${schedulerType}`);
    if (schedulerType === 'roundrobin') {
        console.log(`Quantum: ${quantum}`);
    } else if (schedulerType === 'mfq') {
        console.log(`Levels: ${levels}`);
    }
    console.log("---------------------------");

    // Initialize the system
    const system = new SystemOS();

    // Set the scheduler based on the command line argument or default
    if (schedulerType === 'roundrobin') {
        system.setScheduler(schedulerType, { quantum });
    } else if (schedulerType === 'mfq') {
        system.setScheduler(schedulerType, { levels });
    } else {
        system.setScheduler(schedulerType);
    }

    // Add processes with different arrival times, burst times, and priorities
    system.addProcess(1, 8, 1, 0);
    system.addProcess(2, 4, 2, 1);
    system.addProcess(3, 9, 1, 2);
    system.addProcess(4, 5, 3, 3);

    // Run the scheduler
    system.run();

    // Output the logs to the console
    console.log(system.getLogs());
}

// Execute the simulation
runSimulation();
