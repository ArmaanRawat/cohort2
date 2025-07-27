const { Router } = require("express");
const router = Router();
const jwt = require("jsonwebtoken");
const userMiddleware = require("../middleware/user");
const { User, Course } = require("../db");
const { JWT_SECRET } = require("../config");

// User Routes
router.post("/signup", async (req, res) => {
  // Implement user signup logic
  const username = req.body.username;
  const password = req.body.password;
  const user = await User.create({
    username: username,
    password: password,
  });
  if (user) {
    res.json({
      msg: "user created successfully.",
    });
  } else {
    res.status(403).json({
      msg: "There were errors while creating the user.",
    });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic

  const username = req.body.username;
  const password = req.body.password;

  const check = await User.findOne({
    username: username,
    password: password,
  });

  if (check) {
    const jwtToken = jwt.sign(
      {
        username,
      },
      JWT_SECRET
    );
    if (jwtToken) {
      res.json({
        token: jwtToken,
      });
    } else {
      res.json("There were issues while signing the JWT.");
    }
  } else {
    res.status(403).json({
      msg: "User was not found in the Database.",
    });
  }
});

router.get("/courses", async (req, res) => {
  // Implement listing all courses logic
  const courseArray = await User.find({});
  res.json({
    courses: courseArray,
  });
});

router.post("/courses/:courseId", userMiddleware, async (req, res) => {
  // Implement course purchase logic
  const courseId = req.params.courseId;
  const username = req.headers.username;

  try {
    const result = await User.updateOne(
      { username: username },
      { $push: { purchasedCourses: courseId } }
    );

    if (result.modifiedCount > 0) {
      res.json({
        msg: "Complete and you bought the course.",
      });
    } else {
      res.status(404).json({
        msg: "User not found or course not added.",
      });
    }
  } catch (error) {
    res.status(500).json({
      msg: "Error purchasing course.",
      error: error.message,
    });
  }
});

router.get("/purchasedCourses", userMiddleware, async (req, res) => {
  const user = await User.findOne({ username: req.headers.username }).populate(
    "purchasedCourses"
  );
  console.log(user);
  if (!user) { 
    return res.status(404).json({ msg: "User not found" });
  }
  res.json({ courses: user.purchasedCourses });
});

module.exports = router;
