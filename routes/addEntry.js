const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile"));

router.post("/", (req, res) => {
  const { guess_pattern, game_day, num_of_guesses, user_id, team_id } =
    req.body;

  if (game_day && num_of_guesses && guess_pattern && user_id && team_id) {
    knex("entries")
      .insert({ game_day, num_of_guesses, guess_pattern, user_id, team_id })
      .then((id) => {
        // return res.json({ thing: id });
        res.status(201).json({ game_day, num_of_guesses, guess_pattern });
      })
      .catch((err) => {
        console.log(err);
        return res.json({ msg: "Error" });
      });
  }
});

module.exports = router;
