const schedule = require("node-schedule");
const wordpicker = require("./wordPicker");
const knex = require("knex")(require("../knex_db/knexfile"));

exports.randomWordPickerJob = schedule.scheduleJob(
  "4 9 * * *",
  wordpicker.wordPicker
);

exports.gameDayIncrementorJob = schedule.scheduleJob("4 9 * * *", () => {
  knex("teams")
    .select("current_game_day")
    .limit(1)
    .then((data) => {
      const current_game_day = data[0].current_game_day + 1;
      console.log({ current_game_day });
      knex("teams")
        .update({ current_game_day })
        .then(() => {})
        .catch(() => {
          console.log("Server Error");
        });
    });

  console.log("did it");
});
