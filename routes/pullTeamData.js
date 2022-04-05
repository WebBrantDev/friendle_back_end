const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile"));

router.post("/", (req, res) => {
  const { team_id, user_id, current_game_day } = req.body;
  console.log(team_id);
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
        // console.log(data);
        // const current_game_day =
        //   data.length > 0 ? data[0].current_game_day : 290;
        // console.log(current_game_day);

        data.forEach((item) => {
          const epochDate = item.created_at.getTime() / 1000;
          item.created_at = epochDate;
          let posted = new Date(epochDate);
          item.posted = posted.toLocaleString();
        });
        return res.status(200).json(data);
        // knex("teams")
        //   .select("team_name", "daily_word", "current_game_day")
        //   .where({ id: team_id })
        //   .then((info) => {
        //     console.log(info);
        //     const dataObj = {
        //       entries: data,
        //       team_name: info[0].team_name,
        //       current_game_day: info[0].current_game_day,
        //       daily_word: info[0].daily_word,
        //     };

        // });
      });
  } else {
    return res.status(400).json({ error: "Incomplete data" });
  }
});

module.exports = router;
