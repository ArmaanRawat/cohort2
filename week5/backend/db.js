const mongoose = require("mongoose");

mongoose.connect(
  "mongodb+srv://armaanrawat0055:Physics%4011@cluster0.iiawcbf.mongodb.net/todoApp"
);

const todoSchema = mongoose.Schema({
  title: String,
  description: String,
  completed: Boolean,
});

const todo = mongoose.model("todos", todoSchema);
module.exports = {
  todo,
};
