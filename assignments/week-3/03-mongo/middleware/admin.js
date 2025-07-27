const { Admin } = require("../db");
// Middleware for handling auth
function adminMiddleware(req, res, next) {
    // Implement admin auth logic
    // You need to check the headers and validate the admin from the admin DB. Check readme for the exact headers to be expected
    const adminName = req.headers.username;
    const adminPassword = req.headers.password;
    Admin.findOne({
        username : adminName,
        password : adminPassword
    })
    .then((value) =>{
        if(value){
            next();
        }
        else{
            res.status(403).json({
                msg: "User Doesnt exists" 
            })
        }
    })



}

module.exports = adminMiddleware;