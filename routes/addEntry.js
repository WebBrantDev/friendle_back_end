const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile"));

router.post("/", (req, res) => {
  const { guess_pattern, game_day, num_of_guesses, user_id, team_id } =
    req.body;

  if (game_day && num_of_guesses && guess_pattern && user_id && team_id) {
    knex("entries")
      .select("current_game_day")
      .limit(1)
      .then((data) => {
        if (data.length) {
          const current_game_day = data[0].current_game_day;
          knex("entries")
            .insert({
              game_day,
              num_of_guesses,
              guess_pattern,
              user_id,
              team_id,
              current_game_day,
            })
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
          knex("entries")
            .insert({
              game_day,
              num_of_guesses,
              guess_pattern,
              user_id,
              team_id,
            })
            .then(() => {
              return res
                .status(201)
                .json({ game_day, num_of_guesses, guess_pattern });
            })
            .catch((err) => {
              console.log(err);
              return res.status(500).json({ error: "Server error" });
            });
        }
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
