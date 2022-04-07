const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile"));
const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, (req, res) => {
  const { username } = req.user;
  console.log("HELLO: ", req.user);
  if (!req.user.team_id) {
    knex("users")
      .select("team_id")
      .where({ username })
      .then((user) => {
        const currentUser = user[0];
        req.user.team_id = currentUser.team_id;
        return res.status(200).json(req.user);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    knex("users as u")
      .join("teams as t", "t.id", "u.team_id")
      .select("u.team_id", "t.team_name", "t.daily_word", "t.current_game_day")
      .where({ "u.username": username })
      .then((user) => {
        const currentUser = user[0];
        console.log("CURRENT USER: ", currentUser);
        req.user.team_name = currentUser.team_name;
        req.user.daily_word = currentUser.daily_word;
        req.user.current_game_day = currentUser.current_game_day;
        knex("entries")
          .select("game_day")
          .where({ team_id: currentUser.team_id })
          .then((data) => {
            const trimmedData = [];
            data.forEach(({ game_day }) => {
              if (!trimmedData.includes(game_day)) {
                trimmedData.push(game_day);
              }
            });
            req.user.options = trimmedData.sort((a, b) => b - a);
            return res.status(200).json(req.user);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

module.exports = router;
