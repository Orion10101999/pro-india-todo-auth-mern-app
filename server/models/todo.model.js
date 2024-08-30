import mongoose from "mongoose";

const TodoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  status: {
    type: String,
    enum: ['To Do', 'In Progress', 'Done'], // Restrict status to these values
    default: 'To Do',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  }
},{timestamps : true});

const Todo = mongoose.model('Todo', TodoSchema);

export default Todo;