const { Router } = require("express");
const adminMiddleware = require("../middleware/admin");
const { Admin } = require("../db");
const { Course } = require("../db");
const router = Router();
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = require("../config");

// Admin Routes
router.post("/signup", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const check = await Admin.create({
    username,
    password,
  });

  if (check) {
    res.json({
      msg: "Admin created Successfully.",
    });
  } else {
    res.json({
      msg: "Admin was not created, error in the admin.js .",
    });
  }
});

router.post("/signin", async (req, res) => {
  // Implement admin signup logic
  const username = req.body.username;
  const password = req.body.password;

  const check = await Admin.findOne({
    username,
    password
  });
  if (check) {
    const token = jwt.sign({
        username
    },JWT_SECRET);
    
    res.json({
        token : token
    })
  }
});

router.post("/courses", adminMiddleware, async(req, res) => {
  // Implement course creation logic
   const tittle = req.body.tittle;
    const description = req.body.description;
    const imageLink = req.body.imageLink;
    const price = req.body.price;
    try {
        const check = await Course.create({
            tittle : tittle,
            description : description,
            imageLink : imageLink,
            price : price
        })
    
        if(check){
            res.json({
                msg : "They course have been successfuly created with course id : ", 
                couseId : check._id 
            })
        }
        else{
            res.json({
                msg : "There were some issue while creating the course."
            })
        }
    } catch (error) {
        
    }
});

router.get("/courses", adminMiddleware, async(req, res) => {
  // Implement fetching all courses logic
  const courses = await Course.find({})
  res.json({
    courses : courses
  })
});

module.exports = router;
