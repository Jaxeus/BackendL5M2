//----------IMPORTS----------//
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();

//----------MIDDLEWARE----------//
app.use(express.json());
app.use(cors());

//----------ENDPOINTS----------//
app.get("/", (req, res) => {
  res.send("Hello World!");
});

console.log("Hi");

app.post("/azure", async (req, res) => {
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

  const data = responseJSON.tagsResult.values;

  return res.status(200).send(data);
});

//----------PORT AND LISTEN----------//
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
