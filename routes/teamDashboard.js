const router = require("express").Router();
const knex = require("knex")(require("../knex_db/knexfile"));
const jwt = require("jsonwebtoken");

router.get("/", (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }
  const authToken = req.headers.authorization.split(" ")[1];
  jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid auth token");
    } else {
      return res.status(200).json({ decoded });
    }
  });
});

module.exports = router;
