const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
require("dotenv").config();
const userRouter = require("./router/user.router");
const authRouter = require("./router/auth.router");
// let server;
app.use(cors(
  origin = "*",
));

const start = async () => {
  try {
    app.listen(process.env.PORT, () => {
      console.log(`Server is running on port ${process.env.PORT}...!`);
    });

    const database_connect = await mongoose.connect(
      `${process.env.MONGODB_URI}`,
      {
        dbName: "Blog_Website",
      }
    );
    if (database_connect) {
      console.log("Database connected successfully...!");
    }
  } catch (error) {
    console.log(error);
  }
};
start();

app.use("/api/user", userRouter);
app.use("/api/auth", authRouter);

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
})