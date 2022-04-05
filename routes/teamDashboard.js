const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile"));
const authenticate = require("../middleware/authenticate");

router.get("/", authenticate, (req, res) => {
  const { username } = req.user;
  if (!req.user.team_id) {
    console.log("boop");
    knex("users")
      .select("team_id")
      .where({ username })
      .then((user) => {
        const currentUser = user[0];
        req.user.team_id = currentUser.team_id;
        return res.status(200).json(req.user);
      });
  } else {
    console.log(username);
    knex("users as u")
      .join("teams as t", "t.id", "u.team_id")
      .select("u.team_id", "t.team_name")
      .where({ "u.username": username })
      .then((user) => {
        const currentUser = user[0];
        console.log("hello", user);
        req.user.team_name = currentUser.team_name;
        return res.status(200).json(req.user);
      });
  }
});

module.exports = router;
