const jwt = require("jsonwebtoken");
require("dotenv").config();
const userModel = require("../models/user-Model");
const isLoggedIn = async (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(' ')[1]||"" ;
        if (token) {
            
            let decodedUser = jwt.verify(token, process.env.JWT_SECRET);
            if (!decodedUser) {
                return res.json({
                    success: false,
                    message: ` envalid or expire token.you must need to login!`
                })
            }
            let user = await userModel.findOne({ email: decodedUser.email }).select("-password");
            if (user) {
                req.user = user;
                
               return next();
            } else {
                return res.json({
                    success: false,
                    messsage: `something went wrong!`
                })

            }


        }

    } catch (error) {
        return res.status(500).json({
            success: false,
            messsage: `failed to access: ${error.messsage}`
        })

    }

}
module.exports = isLoggedIn;