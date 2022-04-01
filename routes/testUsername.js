const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile"));

router.post("/", (req, res) => {
  knex("users")
    .select("username")
    .where({ username: req.body.username })
    .then((arr) => {
      console.log(arr.length);
      if (arr.length === 1) {
        return res.json({ isUsed: true });
      } else {
        return res.json({ isUsed: false });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
