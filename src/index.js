import express from "express";

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello");
});

app.listen(PORT, () => {
  console.log("listening on port 3000");
});
