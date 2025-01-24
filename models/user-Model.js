
const mongoose= require("mongoose");
let{Schema,model} = mongoose;

// create user schema
const userSchema = Schema({
    name:{
        type:String,
        required:true,
        minLength:3,
        maxLength:80,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
        minLength:6,
    },
    accounts: [
        {
            type: Schema.Types.ObjectId,
            ref: "accounts"
        }
    ],
})

// end 
// create userModel 
const userModel = model("users",userSchema);
module.exports = userModel;
// end 