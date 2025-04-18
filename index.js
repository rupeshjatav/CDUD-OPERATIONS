import express from "express";
import { UserModel, TodoModel } from "./db.js";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import { Authentication, JWT_SECRET } from "./auth.js";
import { z } from "zod";
import bcrypt from "bcrypt";

const saltRounds = 10;

// DB connection
mongoose.connect(
  "mongodb+srv://Rupesh:XSuz30baPf2GEiY9@cluster0.k2gg1cw.mongodb.net/Todo-App-Database"
);

const app = express();
app.use(express.json());

// ----------------------------
// ✅ SIGN-UP Endpoint
// ----------------------------
app.post("/sign-up", async (req, res) => {
  console.log("sign-up page");

  try {
    const requiredBody = z.object({
      name: z.string().min(2).max(50),
      email: z.string().email(),
      password: z
        .string()
        .min(8)
        .regex(/[a-z]/, { message: "Must include lowercase letter" })
        .regex(/[A-Z]/, { message: "Must include uppercase letter" })
        .regex(/[0-9]/, { message: "Must include a number" })
        .regex(/[@$!%*?&#]/, { message: "Must include a special character" }),
    });

    const ParsedData = requiredBody.safeParse(req.body);

    if (!ParsedData.success) {
      return res
        .status(400)
        .json({ message: "Incorrect format", errors: ParsedData.error.errors }); // ✅ return added
    }

    const { email, name, password } = ParsedData.data; // ✅ use parsed data
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ message: "User already exists" }); // ✅ better error
    }

    const hashPassword = await bcrypt.hash(password, saltRounds);

    await UserModel.create({
      name,
      email,
      password: hashPassword,
    });

    res.json({ message: "User created successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message }); // ✅ improved error
  }
});

// ----------------------------
// ✅ LOGIN Endpoint
// ----------------------------
app.post("/login", async (req, res) => {
  console.log("login page");

  const { email, password } = req.body;
  const user = await UserModel.findOne({ email });

  if (!user) {
    return res.status(403).json({ error: "User not found" }); // ✅ return added
  }

  const decryptedPassword = await bcrypt.compare(password, user.password); // ✅ await used

  if (decryptedPassword) {
    const token = jwt.sign(
      { id: user._id },
      JWT_SECRET,
      { expiresIn: "1h" } // ✅ optional: token expiration
    );

    return res.json({ token });
  } else {
    return res.status(403).json({ message: "Incorrect email or password" }); // ✅ consistent error
  }
});

// ----------------------------
// ✅ TODO Creation
// ----------------------------
app.post("/todo", Authentication, async (req, res) => {
  console.log("todo");

  const userid = req.userId;
  const { title, done } = req.body;

  const todo = await TodoModel.create({
    title,
    done,
    userId: userid,
  });

  res.json({ message: "Todo created", todo });
});

// ----------------------------
// ✅ TODOs Fetch
// ----------------------------
app.get("/todos", Authentication, async (req, res) => {
  const userid = req.userId;

  try {
    const todos = await TodoModel.find({ userId: userid });
    res.json(todos);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error retrieving todos", error: err.message });
  }
});

// ----------------------------
app.listen(5000, () => console.log("App is running on port 5000"));
