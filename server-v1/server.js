const express = require("express");

// create server
const app = express();

// configure and run server

app.get("/check-host/:origin", (req, res) => {
  const hostOrigin = req.params.origin;

  // fake checking
  console.log(hostOrigin);
  valid = Math.random() * 2 < 1 ? true : false;

  // sending response
  res.json({ "host-valid": valid });
});

app.listen(4000);
