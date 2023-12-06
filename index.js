//----------IMPORTS----------//
const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const mongoose = require("mongoose");

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

//MongoDB endpoint
// Connect to MongoDB using Mongoose
mongoose.connect("mongodb://localhost:27017/Missions", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const YourModel = mongoose.model(
  "YourModel",
  new mongoose.Schema({
    url: {
      type: String,
      required: true,
    },
    body: {
      type: String,
      required: true,
    },
    colour: {
      type: String,
      required: true,
    },
    model: {
      type: String,
      required: true,
    },
  })
);

app.get("/getData", async (req, res) => {
  try {
    const mongoData = await YourModel.find({}); // Query your MongoDB collection

    res.json(mongoData);
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

//----------PORT AND LISTEN----------//
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
