const express = require("express");
const app = express();
const port = 3000 || process.env.PORT;

// IP to Geoinformation
const geoip = require("./routes/geoip.js");
app.use("/geoip", geoip);

app.get("/", function (req, res) {
  res.redirect("https://github.com/itsmingjie/micro");
});

app.listen(port, () => {
  console.log(`Micro is listening at http://localhost:${port}`)
});
