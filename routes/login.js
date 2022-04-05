require("dotenv").config();
const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile"));
const validate = require("../utils/validators");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/", (req, res) => {
  const { username, password } = req.body;
  knex("users")
    .select("id", "username", "team_id", "password")
    .where({ username })
    .then((user) => {
      const currentUser = user[0];
      if (currentUser) {
        if (currentUser.team_id) {
          knex("teams as t")
            .join("users as u", "u.team_id", "t.id")
            .select("t.team_name")
            .where({ "u.team_id": currentUser.team_id })
            .then((user) => {
              currentUser.team_name = user[0].team_name;
              if (bcrypt.compareSync(password, currentUser.password)) {
                const { username, id, team_id, team_name } = currentUser;
                const token = jwt.sign(
                  { username, id, team_id, team_name },
                  JWT_SECRET,
                  {
                    expiresIn: "10d",
                  }
                );
                return res.json({ token });
              } else {
                return res.status(401).json({ error: "Invalid password" });
              }
            });
        } else {
          if (bcrypt.compareSync(password, currentUser.password)) {
            const { username, id, team_id, team_name } = currentUser;
            const token = jwt.sign(
              { username, id, team_id, team_name },
              JWT_SECRET,
              {
                expiresIn: "10d",
              }
            );
            return res.json({ token });
          } else {
            return res.status(401).json({ error: "Invalid password" });
          }
        }
      } else {
        return res.status(404).json({ error: "User doesn't exist" });
      }
    });
});

module.exports = router;

// knex("entries as e")
//       .join("users as u", "u.id", "e.user_id")
//       .select(
//         "e.game_day",
//         "e.num_of_guesses",
//         "e.guess_pattern",
//         "e.created_at",
//         "e.team_id",
//         "u.username"
//       )
//       .where({ "e.team_id": team_id })
