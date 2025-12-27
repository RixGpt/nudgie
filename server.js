import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve your current repo as static files (index.html, login.html, birthdays.html, etc.)
app.use(express.static(__dirname, { extensions: ["html"] }));

// Nice default: always serve index.html if someone hits "/"
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

const port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Nudgie running on ${port}`));
