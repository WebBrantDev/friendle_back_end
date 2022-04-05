const wordList = require("./wordList");
const knex = require("knex")(require("../knex_db/knexfile"));

exports.singleWord = () => {
  const daily_word = wordList[Math.floor(Math.random() * wordList.length)];
  return daily_word;
};

exports.wordPicker = () => {
  const daily_word = wordList[Math.floor(Math.random() * wordList.length)];
  console.log(daily_word);
  knex("teams")
    .update({ daily_word })
    .then(() => {
      return;
    })
    .catch((err) => {
      console.log(err);
    });
};
