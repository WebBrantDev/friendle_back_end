const axios = require("axios");
const fs = require("fs");

// Generating a random seed for unique user icons
const seedrandom = require("seedrandom");
const generator = seedrandom();

exports.userIconCall = (username) => {
  const randomSeed = generator();
  const filePath = `/assets/user_icons/${username}_icon.svg`;
  axios
    .get(`https://avatars.dicebear.com/api/identicon/${randomSeed}.svg`)
    .then((res) => {
      fs.writeFile(
        `./assets/user_icons/${username}_icon.svg`,
        res.data,
        (err) => {
          if (err) console.log(err);
          console.log("It worked");
        }
      );
    })
    .catch((err) => {
      console.log(err);
    });
  return filePath;
};
