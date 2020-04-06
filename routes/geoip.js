const route = require("express").Router();
const ipaddr = require("ipaddr.js");
const geoip = require("geoip-lite");
const geo2zip = require("geo2zip");
const fs = require("fs");

const agiData = fs.readFileSync("./data/agi.json");
const agi = JSON.parse(agiData);

// lookup current IP address
route.get("/", (req, res) => {
  res.redirect(`${req.baseUrl}/${req.connection.remoteAddress}`);
});

// list of ranges that the service does not handle
const invalidRanges = [
  "private",
  "unspecified",
  "linkLocal",
  "loopback",
  "uniqueLocal",
  "reserved",
  "multicast",
  "broadcast",
  "carrierGradeNat",
];

// range lookup
route.get("/:ip", (req, res) => {
  var ip;

  try {
    ip = ipaddr.parse(req.params.ip);

    if (invalidRanges.includes(ip.range())) {
      // Invalid Range (See constant above)
      res.status(400);
      res.send("Invalid IP address range.");
    } else if (ip.kind() == "ipv4") {
      // Find data related to the IP address
      var geoData = geoip.lookup(req.params.ip);
      var lnglat = {
        latitude: geoData.ll[0],
        longitude: geoData.ll[1],
      };

      if (geoData.country == "US") {
        // Get Zip Code
        getZip(lnglat).then((data) => {
          var zip = data[0];
          geoData["zip"] = zip;
          geoData["income"] = agi[zip];

          // Duplicate data
          delete geoData["income"]["state"];
        });
      }

      res.send(geoData);
    }
  } catch (err) {
    res.status(400);
    res.send(err.message);
  }
});

async function getZip(loc) {
  return await geo2zip(loc);
}

module.exports = route;
