import mongoose from "mongoose";

const taskSchema = new mongoose.Schema({
  taskName: String,

});

export const Tasks = mongoose.model('Task',taskSchema)