const express = require("express");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const router = express.Router();

const VIDEOS_PATH = "./data/videos.json";

const readVideos = () => {
  const data = fs.readFileSync(VIDEOS_PATH);
  return JSON.parse(data);
};

const writeVideos = (videos) => {
  fs.writeFileSync(VIDEOS_PATH, JSON.stringify(videos, null, 2));
};

router.get("/", function (req, res) {
  const videos = readVideos();
  const videoList = videos.map((video) => ({
    id: video.id,
    title: video.title,
    channel: video.channel,
    image: video.image,
  }));

  res.status(200).json(videoList);
});

router.get("/:id", function (req, res) {
  const videos = readVideos();
  const video = videos.find((video) => video.id === req.params.id);

  if (!video) {
    return res.status(404).json({ message: "Video not found" });
  }

  res.status(200).json(video);
});

router.post("/", function (req, res) {
  const videos = readVideos();

  const { title, description, image } = req.body;
  if (!title || !description || !image) {
    return res
      .status(400)
      .json({ message: "Title and description are required" });
  }

  const newVideo = {
    id: uuid(),
    title,
    channel: "Anonymous",
    image,
    description,
    views: 0,
    likes: 0,
    duration: "0:20",
    video: "http://localhost:8080/stream",
    timestamp: Date.now(),
    comments: [],
  };
  videos.push(newVideo);

  writeVideos(videos);

  res.status(201).json(newVideo);
});

module.exports = router;
