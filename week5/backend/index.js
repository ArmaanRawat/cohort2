const express = require("express");
const { createTodo, updateTodo, deleteTodo } = require("./types");
const { todo } = require("./db");
const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());
app.use(express.json());

app.post("/todo", async (req, res) => {
  try {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if (!parsedPayload.success) {
      res.status(411).json({
        msg: "You have sent the wrong inputs",
      });
      return;
    }
    await todo.create({
      title: createPayload.title,
      description: createPayload.description,
      completed: false,
    });

    res.json({
      msg: "Todo Created.",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

app.get("/todos", async (req, res) => {
  try {
    const todoArray = await todo.find({});
    res.json({
      todos: todoArray,
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

app.put("/completed", async (req, res) => {
  try {
    const updateId = req.body;
    const updateCheck = updateTodo.safeParse(updateId);
    if (!updateCheck.success) {
      res.status(411).json({
        msg: "You have sent the wrong inputs",
      });
      return;
    }

    await todo.updateOne(
      {
        _id: updateId.id,
      },
      {
        completed: true,
      }
    );
    res.json({
      msg: "Todo marked as Completed",
    });
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

app.delete("/deleteTodo", async (req, res) => {
  try {
    const deletePayload = req.body;
    const deleteCheck = deleteTodo.safeParse(deletePayload);
    if (!deleteCheck.success) {
      res.status(411).json({
        msg: "You have sent the wrong inputs",
      });
      return;
    }

    const result = await todo.deleteOne({
      _id: deletePayload.id,
    });

    if (result.deletedCount === 0) {
      res.status(404).json({
        msg: "Todo not found",
      });
      return;
    } else {
      res.json({
        msg: "Todo deleted",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Internal server error",
    });
  }
});

app.listen(port, () => {
  console.log("App is Listening at the Port 3000");
});
