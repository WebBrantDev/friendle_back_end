require("dotenv").config();
const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile"));
const validate = require("../utils/validators");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const JWT_SECRET = process.env.JWT_SECRET;

router.post("/", (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  knex("users")
    .select("id", "username", "team_id", "password")
    .where({ email })
    .then((user) => {
      const currentUser = user[0];
      if (currentUser) {
        if (bcrypt.compareSync(password, currentUser.password)) {
          const { username, id, team_id } = currentUser;
          const token = jwt.sign({ username, id, team_id }, JWT_SECRET, {
            expiresIn: "10d",
          });
          console.log(`Token: ${token}`);
          return res.json({ token });
        } else {
          return res
            .header("Access-Control-Allow-Origin", "*")
            .status(401)
            .json({ error: "Invalid password" });
        }
      } else {
        return res
          .header("Access-Control-Allow-Origin", "*")
          .status(404)
          .json({ error: "User doesn't exist" });
      }
    });
});

module.exports = router;
