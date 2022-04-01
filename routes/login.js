require("dotenv").config();
const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile"));
const validate = require("../utils/validators");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/", (req, res) => {
  const { email, password } = req.body;
  knex("users")
    .select("id", "username", "team_id", "password")
    .where({ email })
    .then((user) => {
      console.log(user);
      if (bcrypt.compareSync(password, user[0].password)) {
        const { username, id, team_id } = user[0];
        const token = jwt.sign({ username, id, team_id }, JWT_SECRET, {
          expiresIn: "10d",
        });
        console.log(`Token: ${token}`);
        return res.json({ token });
      } else {
        return res.send("nope");
      }
    });
});

module.exports = router;
