const userModel = require("../models/user-Model");
const brcypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()


// get all account 
const getAllAccount = async(req,res) =>{
    try {
        let user = await userModel.findOne({email:req.user.email}).populate("accounts");
        if(user){
          res.json({
            success:true,
            accounts:user.accounts,
            message:`all accounts fetched successfully!`
          })
        }
        
    } catch (error) {
        res.json({
            success:false,
            message:`failed to get accounts: ${error.message}`
        })
        
    }

}
// end 

// register 
const resgisterUser = async (req, res) => {
    try {
        let name;
        let email;
        let password;
        ({ name, email, password } = req.body);
        if (name && email && password) {
            let user = await userModel.findOne({ email });
            if (user) {
                res.json({
                    success: false,
                    message: `user alreday exist! please login!`,
                })
            }
            let hash = await brcypt.hash(password, 10);
            let createdUser = await userModel.create({
                name, email, password: hash,
            });
            res.status(201).json({
                success: true,
                message: `register successfully!`,
                createdUser,
            })


        } else {
            res.status(500).json({
                success: false,
                message: `pleaseenter all field!`
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `failed to register user:${error.message}`
        })

    }
}
// end 

// login user 
const loginUser = async (req, res) => {
    try {
        let email;
        let password;
        ({email,password} = req.body);
        if(email &&password){
            let user = await userModel.findOne({email});
            if(!user){
                return res.json({
                    success:false,
                    message:`failed to login email or pasword incorrect!`
                })
            }
            let result = await brcypt.compare(password,user.password);
            if(!result){
                return res.json({
                    success:false,
                    message:`failed to login email or pasword incorrect!`
                })

            }
            let token = jwt.sign({email:user.email,_id:user.id},process.env.JWT_SECRET,{expiresIn:"24h"});
            res.status(200).json({
                success:true,
                user,
                token,
                message:`your account has been loggedIn!`


            })
            
        }else{
            res.json({
                success:false,
                message:`failed to login:please enter all field`
            })
        }

    } catch (error) {
        res.status(500).json({
            success: false,
            message: `failed to login :${error.message}`
        })

    }
}
// end 
// logout 
const logoutUser = (req,res)=>{
    if(req.cookies){
        res.cookie("token","")
        res.status(200).json({
            success:true,
            message:"your account has been logged out!"
        })
    }else{
        res.status(500).json({
            success:false,
            message:"failed to logout!"
        })


    }

}
// end 


module.exports = {
    resgisterUser,
    loginUser,
    logoutUser,
    getAllAccount
}