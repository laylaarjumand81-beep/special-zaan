const path = require("path");
const express = require("express");
require("dotenv").config({ path: path.join(__dirname, "..", ".env"), quiet: true });

const FRONTEND_DIR = path.join(__dirname, "..");
const FRONTEND_FILES = ["styles.css", "chat-widget.css"];
const PORT = Number(process.env.PORT) || 3000;

const app = express();

app.disable("x-powered-by");

app.get("/", (req, res) => {
  res.sendFile(path.join(FRONTEND_DIR, "index.html"));
});

FRONTEND_FILES.forEach((file) => {
  app.get("/" + file, (req, res) => {
    res.sendFile(path.join(FRONTEND_DIR, file));
  });
});

app.listen(PORT, () => {
  console.log("Server running on http://localhost:" + PORT);
});
