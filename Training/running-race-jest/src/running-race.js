const uuidv4 = require('uuid/v4');

class Race {
    constructor() {
        this.runners = [];
    }

    getRunners(){
        return this.runners;
    }

    addRunner(runner) {
        runner.id = uuidv4();
        this.runners.push(runner);
    }

    start(){
        this.startTime = Date.now();
        this.runners.forEach(runner => {
            runner.startTime = Date.now();
        });

        return new Promise((resolve, reject) => {
            setTimeout(() => {
                const raceId = uuidv4();
                resolve(raceId);
            },300);
        });
    }
}

module.exports = Race;