const express = require("express");
const cookieParser = require("cookie-parser");
const { dbConnect } = require("./db/connection");
const { userRouter } = require("./routes/userRoute");

const app = express();

app.use(express.json());
app.use(cookieParser());

const PORT = process.env.PORT || 3001;

app.use("/api/v1/user", userRouter);

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send({ message: `Something went wrong : ${err.message}` });
  }
});

app.listen(PORT, () => {
  console.log(`Server is up and running on ${PORT}`);
});

dbConnect();
