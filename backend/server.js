import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("App is running ... ");
});

const PORT = 5000;

app.listen(PORT, console.log(`Server is running on  at port ${PORT}`));
