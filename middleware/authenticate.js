const jwt = require("jsonwebtoken");
const knex = require("knex")(require("../knex_db/knexfile"));

const authenticate = (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).send("Please login");
  }
  const authToken = req.headers.authorization.split(" ")[1];
  jwt.verify(authToken, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).send("Invalid auth token");
    }
    req.user = decoded;
    if (!req.user.team_id) {
      console.log("HELLOOOO");
      knex("users")
        .select("team_id")
        .where({ id: req.user.id })
        .then((data) => {
          req.user.team_id = data[0].team_id;
          next();
        });
    } else {
      next();
    }
  });
};

module.exports = authenticate;
