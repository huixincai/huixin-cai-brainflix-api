require("dotenv").config();

const express = require("express");
const cors = require("cors");

const PORT = process.env.PORT || 8080;
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());
app.use(express.static("public"));

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
