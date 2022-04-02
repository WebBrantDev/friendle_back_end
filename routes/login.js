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
      const currentUser = user[0];
      console.log(currentUser);
      if (currentUser) {
        if (bcrypt.compareSync(password, currentUser.password)) {
          const { username, id, team_id } = currentUser;
          const token = jwt.sign({ username, id, team_id }, JWT_SECRET, {
            expiresIn: "10d",
          });
          console.log(`Token: ${token}`);
          res.header.add("Access-Control-Allow-Origin", "https://friendle.one");
          return res.json({ token });
        } else {
          return res.status(401).json({ error: "Invalid password" });
        }
      } else {
        return res.status(404).json({ error: "User doesn't exist" });
      }
    });
});

module.exports = router;
