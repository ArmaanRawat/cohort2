
const express = require("express");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const jwtPassword = "123456";

mongoose.connect("mongodb+srv://armaanrawat0055:Physics%4011@cluster0.iiawcbf.mongodb.net/user_app");

const User = mongoose.model("User", {
  name: String,
  username: String,
  password: String,
});

const app = express();
app.use(express.json());

async function userExists(username, password) {
  const user = await User.findOne({ username: username, password: password });
  return user !== null;
}

app.post("/signin", async function (req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const exists = await userExists(username, password);
  if (!exists) {
    return res.status(403).json({
      msg: "User doesnt exist in our database",
    });
  }

  var token = jwt.sign({ username }, jwtPassword);
  return res.json({
    token,
  });
});

app.get("/users", async function (req, res) {
  const token = req.headers.authorization;
  try {
    const decoded = jwt.verify(token, jwtPassword);
    const username = decoded.username;
    
    // return a list of users other than this username from the database
    const users = await User.find({ username: {  username } });
    const userList = users.map(user => ({
      name: user.name,
      username: user.username
    }));
    
    return res.json(userList);
  } catch (err) {
    return res.status(403).json({
      msg: "Invalid token",
    });
  }
});

app.post('/signup', async (req, res) => {  
  const name = req.body.name;
  const username = req.body.username;
  const password = req.body.password;
  
  const alreadyExistingUser = await User.findOne({ username: username });
  if (alreadyExistingUser) {
    return res.status(400).json({ msg: "User already exists" });
  }
  
  const user = new User({
    name: name, 
    username: username, 
    password: password
  });

  await user.save();
  return res.json({
    msg: "User Successfully Created"
  });
});

app.listen(3000);
