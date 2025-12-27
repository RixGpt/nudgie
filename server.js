const express = require("express");
const path = require("path");

const app = express();

// If your HTML files are in the repo root:
app.use(express.static(__dirname, { extensions: ["html"] }));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log(`Nudgie listening on port ${port}`);
});
