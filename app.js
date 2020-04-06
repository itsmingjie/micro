const express = require("express");
const app = express();
const rateLimit = require("express-rate-limit");

const port = 3000 || process.env.PORT;

// Rate limit at 5 requests per second
const limiter = rateLimit({
  windowMs: 1000,
  max: 5
});

app.use(limiter);

app.get("/", (req, res) => {
  res.redirect("https://github.com/itsmingjie/micro");
})

const api = require("express").Router();
app.use("/api/", api);

// IP to Geoinformation
const geoip = require("./routes/geoip.js");
api.use("/geoip", geoip);

// Hit test
api.get("/", function (req, res) {
  res.status(200).json({message: "Up and running!"}).end();
});

app.listen(port, () => {
  console.log(`Micro is listening at port ${port}`)
});
