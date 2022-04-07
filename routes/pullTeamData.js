const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile"));
const authenticate = require("../middleware/authenticate");

router.post("/", authenticate, (req, res) => {
  const { team_id, user_id, current_game_day } = req.body;
  if (team_id) {
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
      .where({ "e.game_day": current_game_day })
      .then((data) => {
        data.forEach((item) => {
          const epochDate = item.created_at.getTime() / 1000;
          item.created_at = epochDate;
          let posted = new Date(epochDate);
          item.posted = posted.toLocaleString();
        });
        return res.status(200).json(data);
      });
  } else {
    return res.status(400).json({ error: "Incomplete data" });
  }
});

module.exports = router;
