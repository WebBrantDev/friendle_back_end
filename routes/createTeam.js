const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile"));
const authenticate = require("../middleware/authenticate");
const wordpicker = require("../utils/wordPicker");

router.post("/", authenticate, (req, res) => {
  const data = req.body;
  const game_type = data.game_type || "default";
  const { user_id, team_name } = data;
  const daily_word = wordpicker.singleWord();
  if (user_id && team_name) {
    knex("teams")
      .insert({ game_type, team_name, daily_word })
      .then((team_id) => {
        knex("users")
          .where({ id: user_id })
          .update({ team_id: team_id[0] })
          .then(() => {
            knex("teams")
              .select("id", "game_type", "team_name")
              .where({ id: team_id[0] })
              .then((user) => {
                console.log(user[0]);
                return res.json(user[0]);
              });
          });
      })
      .catch((err) => {
        console.log(err);
        return res.json({ msg: "Error" });
      });
  } else {
    res.status(400).send("Invalid data");
  }
});

module.exports = router;
