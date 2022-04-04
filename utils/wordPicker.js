const schedule = require("node-schedule");
const wordList = require("./wordList");
const knex = require("knex")(require("../knex_db/knexfile"));

const wordPicker = () => {
  const daily_word = wordList[Math.floor(Math.random() * wordList.length)];
  console.log(daily_word);
  knex("teams")
    .update({ daily_word })
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
  return;
};

const randomWordPickerJob = schedule.scheduleJob("0 0 * * 0-6", wordPicker);

module.exports = randomWordPickerJob;
