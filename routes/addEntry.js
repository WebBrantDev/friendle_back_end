const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile"));

router.post("/", (req, res) => {
  const { guess_pattern, game_day, num_of_guesses, user_id, team_id } =
    req.body;

  if (game_day && num_of_guesses && guess_pattern && user_id && team_id) {
    knex("entries")
      .insert({ game_day, num_of_guesses, guess_pattern, user_id, team_id })
      .then(() => {
        return res
          .status(201)
          .json({ game_day, num_of_guesses, guess_pattern });
      })
      .catch((err) => {
        console.log(err);
        return res.status(500).json({ error: "Server error" });
      });
  } else {
    return res.status(400).json({ error: "Incomplete data" });
  }
});

module.exports = router;
