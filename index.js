const express = require("express");
const cors = require("cors");
const axios = require("axios");

require("dotenv").config();
const app = express();
app.use(express.json());
app.use(cors());

const config = { headers: { Authorization: `Bearer ${process.env.API_KEY}` } };

app.get("/", (req, res) => {
  res.status(200).json({ message: "Welcome on Delivroo server" });
  try {
  } catch (error) {
    if (error.status) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});
app.get("/getdata", async (req, res) => {
  const { data } = await axios.get(
    "https://lereacteur-bootcamp-api.herokuapp.com/api/deliveroo/menu/paris/3eme-temple/sub-arc-subway-rambuteau?day=today&geohash=u09wj8rk5bqr&time=ASAP",
    config
  );

  res.status(200).json(data);
  try {
  } catch (error) {
    if (error.status) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

app.all("*", (req, res) => {
  try {
    res.status(404).json({ message: "Page introuvable." });
  } catch (error) {
    if (error.status) {
      res.status(error.status).json({ message: error.message });
    } else {
      res.status(400).json({ message: error.message });
    }
  }
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log("server on");
});
