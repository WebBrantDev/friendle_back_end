const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile"));

router.post("/", (req, res) => {
  console.log(req.body);
  const { team_name, user_id } = req.body;
  res.status(200).json({ team_name, user_id });
});

module.exports = router;
