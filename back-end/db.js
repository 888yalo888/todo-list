import mongoose from "mongoose";

await mongoose.connect('mongodb://127.0.0.1:27017/todolist');

export const Task = mongoose.model('Task', { title: String });
