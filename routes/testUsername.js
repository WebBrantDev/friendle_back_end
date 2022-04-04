const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile"));

router.post("/", (req, res) => {
  knex("users")
    .select("username")
    .where({ username: req.body.username })
    .then((arr) => {
      if (arr.length >= 1) {
        return res.json({ isUsed: true });
      } else {
        return res.status(200).json({ isUsed: false });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
