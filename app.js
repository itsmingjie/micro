const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const port = process.env.PORT || 3000;

// Rate limit at 5 requests per second
const limiter = rateLimit({
	windowMs: 1000,
	max: 5,
});

app.use(limiter);

app.get("/", (req, res) => {
	res.redirect("https://github.com/itsmingjie/micro");
});

const api = require("express").Router();
app.use("/api/", api);

api.use(cors());

// IP to Geoinformation
const geoip = require("./routes/geoip.js");
api.use("/geoip", geoip);

// Toggl data
const toggl = require("./routes/toggl.js");
api.use("/toggl", toggl);

// Jumbo: generate SEO card from query
const jumbo = require("./routes/jumbo.js");
api.use("/jumbo", jumbo);

// Hit test
api.get("/", function (req, res) {
	res.status(200).json({ message: "Up and running!" }).end();
});

app.listen(port, () => {
	console.log(`Micro is listening at port ${port}`);
});
