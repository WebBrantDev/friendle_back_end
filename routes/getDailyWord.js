const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile"));

router.get("/", (req, res) => {
  knex("teams")
    .select("daily_word")
    .then((data) => {
      const dailyWord = data[0].daily_word;
      res.status(200).json({ dailyWord });
    })
    .catch(() => {
      res.status(400).json({ error: "Server error" });
    });
});

module.exports = router;
