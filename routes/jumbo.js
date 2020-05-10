const express = require("express");
const bodyParser = require("body-parser");
const puppeteer = require("puppeteer");
const fs = require("fs");
const Handlebars = require("handlebars");

const app = express();

require("dotenv").config();

app.use(bodyParser.json());

app.get("/", async (req, res) => {
  const template = req.query.template || "default";
  // const filename = uuidv4();

  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const hbsTemplate = Handlebars.compile(
    fs.readFileSync(`./data/jumbo/${template}.html`).toString()
  );
  const content = hbsTemplate({
    title: req.query.title,
    desc: req.query.desc,
  });

  await page.setContent(content, { waitUntil: "networkidle0" });
  const buffer = await page.screenshot({
    type: "png",
    fullPage: true,
  });
  res.writeHead(200, {
    "Content-Length": buffer.length,
    "Content-Type": "image/png",
  });
  res.end(buffer);
  await browser.close();
});

module.exports = app;
