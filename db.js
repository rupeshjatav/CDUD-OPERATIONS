import mongoose from "mongoose";

const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

const Todo = new Schema({
  title: String,
  done: Boolean,
  userId: ObjectId,
});

// users - collection
// User - schema

//.model - helps to insert data into user collection(record)
const UserModel = mongoose.model("users", User);
const TodoModel = mongoose.model("todos", Todo);

export { UserModel, TodoModel };
