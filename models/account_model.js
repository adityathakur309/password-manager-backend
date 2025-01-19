const mongoose= require("mongoose");
let{Schema,model} = mongoose;

// create user schema
const accountSchema = Schema({
    user:{
        type:Schema.Types.ObjectId,ref:"users",
    },
    accountName:{
        type:String,
        required:true,
        minLength:3,
        maxLength:80,
        unique:true,
    },
    email:{
        type:String,
        required:true,

    },
    password:{
        type:String,
        required:true,
    },
    isShow:{
        type:Boolean,
        default:false,
    }
})

// end 
// create userModel 
const accountModel = model("accounts",accountSchema);
module.exports = accountModel;
// end 