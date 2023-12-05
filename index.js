const express = require("express");
const app = express();
const cors = require("cors");
const PORT = 4000;
const dotenv = require("dotenv");
dotenv.config();

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.post("/", async (req, res) => {
  const imageURL = req.body.imageURL;

  const apiEndpoint = process.env.VISION_ENDPOINT;
  const apiKey = process.env.VISION_KEY;
  const headers = {
    "Content-Type": "application/json",
    "Ocp-Apim-Subscription-Key": apiKey,
  };

  const requestPost = {
    method: "POST",
    headers: headers,
    body: JSON.stringify({ url: imageURL }),
  };

  const response = await fetch(apiEndpoint, requestPost);
  const responseJSON = await response.json();
  return res.status(200).json(responseJSON);
});

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
