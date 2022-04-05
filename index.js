if (process.env.NODE_ENV !== "production") require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

// Routes
const signupRoute = require("./routes/signup");
const loginRoute = require("./routes/login");
const createTeamRoute = require("./routes/createTeam");
const addEntryRoute = require("./routes/addEntry");
const teamDashboardRoute = require("./routes/teamDashboard");
const testUsernameRoute = require("./routes/testUsername");
const pullTeamDataRoute = require("./routes/pullTeamData");
const jobs = require("./utils/cronJobs");

const app = express();
const PORT = process.env.PORT || 8080;

jobs.randomWordPickerJob;
jobs.gameDayIncrementorJob;

app.use(express.json());
app.use(cors());
app.use(morgan("dev"));

app.use("/signup", signupRoute);
app.use("/login", loginRoute);
app.use("/createTeam", createTeamRoute);
app.use("/addEntry", addEntryRoute);
app.use("/teamDashboard", teamDashboardRoute);
app.use("/testUsername", testUsernameRoute);
app.use("/pullTeamData", pullTeamDataRoute);

if (process.env.NODE_ENV === "production") {
  app.use(express.static("../client_friendle/build"));
  app.get("*", (req, res) => {
    res.sendFile(
      path.join(__dirname, "../client_friendle", "build", "index.html")
    );
  });
}

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
