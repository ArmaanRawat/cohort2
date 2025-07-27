const {User} = require("../db");
const {Course} = require("../db");
const { Router } = require("express");
const router = Router();
const userMiddleware = require("../middleware/user");

// User Routes
router.post('/signup', async(req, res) => {
    // Implement user signup logic
    const username = req.body.username;
    const password = req.body.password;

    const check = await User.create({
        username,
        password
    })
    if(check){
        res.json({
            msg : "User created Successfuly"
        })
    }

});

router.get('/courses', async(req, res) => {
    // Implement listing all courses logic
    const promise  = await Course.find({});
    res.json({
        courses : promise
    })
});

router.post('/courses/:courseId', userMiddleware, async (req, res) => {
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
                msg: "Complete and you bought the course."
            });
        } else {
            res.status(404).json({
                msg: "User not found or course not added."
            });
        }
    } catch (error) {
        res.status(500).json({
            msg: "Error purchasing course.",
            error: error.message
        });
    }
});

router.get('/purchasedCourses', userMiddleware, async (req, res) => {
    // Implement fetching purchased courses logic
    const user = await User.findOne({
        username: req.headers.username
    });

    console.log(user.purchasedCourses);
    const courses = await Course.find({
        _id: {
            "$in": user.purchasedCourses
        }
    });

    res.json({
        courses: courses
    })
});

module.exports = router