// requiring importtant packege and module 
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const connectDb = require("./models/db");
const accountRouter = require("./routes/account-Router")
const userRouter = require("./routes/user-Router");

// end 
const app = express();
dotenv.config();
// setting middleware and parser 
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
app.use(cors());
// en

// use routes 
app.get("/",(req,res) =>{
    res.send("hello from the server");
})
app.use("/users",userRouter)
app.use("/accounts",accountRouter)// end
// listen the server 
app.listen(process.env.PORT,() =>{
    console.log(`server is running on port ${process.env.PORT}`);
})
// end 

