
import { Schema, model } from "mongoose";

const taskSchema = new Schema({
  idUser: String,
  myTask: String,
  date: String,
  status: String,
})

const loginSchema = new Schema({
  name: String,
  email: String,
  tel: Number,
  profile: String,
  password: String,
  create_at: String,
  update_at: String,
})

export const login = model("Login", loginSchema);
export const task = model("Task", taskSchema);
