const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile"));

router.post("/", (req, res) => {
  const { team_id, user_id, game_day } = req.body;
  knex("entries as e")
    .join("users as u", "u.id", "e.user_id")
    .select(
      "e.game_day",
      "e.num_of_guesses",
      "e.guess_pattern",
      "e.created_at",
      "e.team_id",
      "u.username"
    )
    .where({ "e.team_id": team_id })
    // .where({ "e.game_day": game_day })
    .then((data) => {
      data.forEach((item) => {
        const epochDate = item.created_at.getTime() / 1000;
        item.created_at = epochDate;
        let posted = new Date(epochDate);
        item.posted = posted.toLocaleString();
      });
      res.json(data);
    });
});

module.exports = router;
