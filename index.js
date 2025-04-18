import express from "express";
import { UserModel, TodoModel } from "./db.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

mongoose.connect(
  "mongodb+srv://Rupesh:XSuz30baPf2GEiY9@cluster0.k2gg1cw.mongodb.net/Todo-App-Database"
);
const app = express();
app.use(express.json());

function Authentication(req, res, next) {
  const token = req.headers.token;
  const decodedData = jwt.verify(token, JWT_SECRET);

  console.log(decodedData);

  if (decodedData) {
    req.userId = decodedData.id;
  }
  next();
}

const JWT_SECRET = "abcdef";
//sign-up
app.post("/sign-up", async (req, res) => {
  console.log("sign-up page");
  await UserModel.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });
  res.json({ message: "you're logined" });
});

//login
app.post("/login", async (req, res) => {
  console.log("login page");

  const { email, password } = req.body;
  const user = await UserModel.findOne({ email, password });

  if (user) {
    console.log(user);

    const token = jwt.sign(
      {
        id: user._id,
      },
      JWT_SECRET
    );

    console.log(token);
    res.json({
      token: token,
    });
  } else {
    res.status(403).json({
      message: "Incorrect email / passowrd",
    });
  }
});

//middleware to check authenticated
app.use(Authentication);

//todo
app.post("/todo", Authentication, async (req, res) => {
  console.log("todo");

  const userid = req.userId;

  const { title, done } = req.body;

  const todo = await TodoModel.create({
    title,
    done,
    userId: userid,
  });

  res.json({
    message: "todo created",
    todo,
  });
});

//todos
app.get("/todos", Authentication, async (req, res) => {
  const userid = req.userId;

  try {
    const todos = await TodoModel.find({ userId: userid });
    res.json(todos);
  } catch (err) {
    res.status(500).json({ message: "Error retrieving todos" });
  }
});

app.listen(5000, () => console.log("App is running on 5000 server"));
