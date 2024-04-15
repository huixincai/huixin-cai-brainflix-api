require("dotenv").config();

const express = require("express");
const cors = require("cors");

const videoRouter = require("./routes/videos");

const PORT = process.env.PORT || 8080;
const CLIENT_URL = process.env.CLIENT_URL;

const app = express();

app.use(cors({ origin: CLIENT_URL }));
app.use(express.json());
app.use(express.static("public"));

app.get("/", (_req, res) => {
  res.send("Welcome to my API!");
});

app.use((req, res, next) => {
  if (req.query.api_key !== "secretpassword") {
    return res
      .status(401)
      .send("Please provide an api_key as a query parameter");
  }
  next();
});

app.use("/videos", videoRouter);

app.listen(PORT, () => {
  console.log(`🚀 Server running on ${PORT}`);
});
