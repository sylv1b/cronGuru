const cron = require('node-cron');
const { fetchChallengesAndVote } = require('./src/calls')
const { interval } = require('./src/config')

let voteCounter = 0;

const task = cron.schedule(interval, () => {
    voteCounter += 1
    console.log(`--- Autovoting (${voteCounter}) ---`);
    fetchChallengesAndVote();
});

fetchChallengesAndVote()

task.start();