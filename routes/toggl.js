const express = require("express");
const fetch = require("node-fetch");
const bodyParser = require("body-parser");
const config = require("../config");

const app = express();

require("dotenv").config();

app.use(bodyParser.json());

app.get("/", (req, res) => {
	fetch("https://www.toggl.com/api/v8/time_entries/current", {
		headers: {
			Authorization: `Basic ${Buffer.from(
				config.TOGGL_TOKEN + ":api_token"
			).toString("base64")}`,
		},
	})
		.then((response) => response.json())
		.then((data) => {
			if (data.data !== null) {
				res.send({
					running: true,
					name: data.data.description,
					start: data.data.start,
				});
			} else {
				res.send({
					running: false,
				});
			}
		});
});

module.exports = app;