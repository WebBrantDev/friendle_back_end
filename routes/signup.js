const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile"));
const bcrypt = require("bcryptjs");
const validate = require("../utils/validators");
const outsideApi = require("../utils/outsideApiCalls");

router.post("/", (req, res) => {
  const data = req.body;
  const { username, email, password, team_id } = data;
  const formattedUsername = username.replace(/ /g, "_");
  if (validate.emailCheck(email) && username) {
    const hashedPassword = bcrypt.hashSync(password, 10);
    const avatar = outsideApi.userIconCall(formattedUsername);
    console.log(avatar);
    knex("users")
      .insert({ avatar, username, email, password: hashedPassword, team_id })
      .then((id) => {
        knex("users")
          .select("id", "username", "team_id")
          .where({ id })
          .then((user) => {
            return res.json(user[0]);
          });
      })
      .catch((err) => {
        console.log(err);
        return res.json({ msg: "Error" });
      });
  } else {
    res.status(400).send("Email invalid");
  }
});

module.exports = router;
