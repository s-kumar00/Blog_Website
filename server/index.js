const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = express();
app.use(express.json());
require("dotenv").config();
const userRouter = require("./router/user.router");
const authRouter = require("./router/auth.router");
const jwt = require("jsonwebtoken");
const cookiesParser = require("cookie-parser");
const bodyParser = require("body-parser");
app.use(cookiesParser());
app.use(bodyParser.json());

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

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



// const authorization = (req, res, next) => {
//   const token = req.cookies.access_token;
//   if (!token) {
//     return res.sendStatus(403);
//   }
//   try {
//     const data = jwt.verify(token, "YOUR_SECRET_KEY");
//     req.userId = data.id;
//     req.userRole = data.role;
//     return next();
//   } catch {
//     return res.sendStatus(403);
//   }
// };

// app.get("/", (req, res) => {
//   return res.json({ message: "Hello World 🇵🇹 🤘" });
// });

// app.get("/login", (req, res) => {
//   const token = jwt.sign({ id: 7, role: "captain" }, "YOUR_SECRET_KEY");
//   return res
//     .cookie("access_token", token, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === "production",
//     })
//     .status(200)
//     .json({ message: "Logged in successfully 😊 👌" });
// });

// app.get("/protected", authorization, (req, res) => {
//   return res.json({ user: { id: req.userId, role: req.userRole } });
// });

// app.get("/logout", authorization, (req, res) => {
//   return res
//     .clearCookie("access_token")
//     .status(200)
//     .json({ message: "Successfully logged out 😏 🍀" });
// });