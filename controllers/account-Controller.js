const accountModel = require("../models/account_model");
const userModel = require("../models/user-Model");
const  mongoose = require("mongoose");



// create account 
const createAccount =async (req,res) =>{
    try {
        let accountName;
        let email;
        let password;
        ({accountName,password,email} = req.body);
        let requestedUser = req?.user;
        let user =await userModel.findOne({email:requestedUser.email});
      
        if(accountName&&email&&password){
            let account = await accountModel.findOne({accountName});
            if(account){
                return res.json({
                    success:false,
                    message:`account alredy exist!`
                })
            }else{
              
                let createdAccount = await accountModel.create({
                    user:user._id,
                    accountName,
                    email,
                    password,

                })
              
                user.accounts.push(createdAccount._id);
                await user.save();

                res.status(201).json({
                    success:true,
                    createdAccount,
                    message:`account and password saved successfully!`

                })
            }



        }else{
            res.status(401).json({
                success:false,
                message:"failed to create account. please all field!"
            })
        }

        
    } catch (error) {
        res.status(401).json({
            success:false,
            message:`failed to create account:${error.message}`
        })
        
    }
}
// end 
// update account 
const updateAccount  = async(req,res) =>{
    try {
        let id;
        ({id} = req.params);
        if(!mongoose.Types.ObjectId.isValid(id)){
            return res.status(404).json({
                success:false,
                message:"account not found!"
            })
        }
        if (Object.keys(req.body).length === 0) {
            return res.status(401).json({
                success: false,
                message: "Please provide updating information!"
            });
        } else{
        let obj = {
            $set:{...req?.body}
        }
        let account = await accountModel.findByIdAndUpdate(id,obj,{new:true});
        if(account){
            res.status(200).json({
                success:true,
                account,
                message:`account updated successfully!`
            })
        }else{
           return res.json({
                success:false,
                message:`failed to update account!`
            })
        }

        }
        
        
    } catch (error) {
        res.json({
            success:false,
            message:`failed to update account:${error.message}!`
        })
        
    }
}
// end 
// delete acoount 
const deleteAccount = async(req,res) =>{
    try {
        let id;
        ({id} = req.params);
        if(!id){
            res.status(404).json({
                success:false,
                message:`failed to delete account: account not found!`
            })

        }
        let deletedAccount = await accountModel.findOneAndDelete({_id:id});
        if(deleteAccount){
            let user = await userModel.findOne({email:req.user.email});
            let accounts = [...user.accounts].filter((curr) =>{
                return curr._id.toString()!==id.toString();
            });
            user.accounts = accounts;
            await user.save();
            
            res.status(200).json({
                success:true,
                deletedAccount,
                mesaage:`account delete successfully!`
            })
        }

        
    } catch (error) {
        res.json({
            success:false,
            message:`failed to delete account:${error.message}`
        })
        
    }
}
// end 

module.exports = {
    createAccount,
    updateAccount,
    deleteAccount,
}
