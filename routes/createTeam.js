const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile"));

router.post("/", (req, res) => {
  const data = req.body;
  const game_type = data.game_type || "default";
  const { user_id, team_name } = data;
  if (user_id && team_name) {
    knex("teams")
      .insert({ game_type, team_name })
      .then((team_id) => {
        knex("users")
          .where({ id: user_id })
          .update({ team_id: team_id[0] })
          .then(() => {
            knex("teams")
              .select("id", "game_type", "team_name")
              .where({ id: team_id[0] })
              .then((user) => {
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
