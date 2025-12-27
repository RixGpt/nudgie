import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve everything in your repo root as static files
app.use(express.static(__dirname, { extensions: ["html"] }));

// Default route
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

// IMPORTANT: listen on the port Cloud Run provides
const port = process.env.PORT || 8080;
app.listen(port, "0.0.0.0", () => {
  console.log(`Nudgie running on port ${port}`);
});
