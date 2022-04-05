const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile"));
const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, (req, res) => {
  const { username } = req.user;
  console.log(req.user);
  if (!req.user.team_id) {
    console.log("boop");
    knex("users")
      .select("team_id")
      .where({ username })
      .then((user) => {
        const currentUser = user[0];
        console.log("USER TEAM ID: ", currentUser);
        req.user.team_id = currentUser.team_id;
        return res.status(200).json(req.user);
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    console.log(username);
    knex("users as u")
      .join("teams as t", "t.id", "u.team_id")
      .select("u.team_id", "t.team_name", "t.daily_word", "t.current_game_day")
      .where({ "u.username": username })
      .then((user) => {
        const currentUser = user[0];
        console.log("current user: ", currentUser);
        req.user.team_name = currentUser.team_name;
        req.user.daily_word = currentUser.daily_word;
        req.user.current_game_day = currentUser.current_game_day;
        console.log("THING", req.user);
        return res.status(200).json(req.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }
});

module.exports = router;
