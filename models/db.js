const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config()

mongoose.connect(process.env.DB_URL).then(() =>{
    console.log(`databse connected...`)
}).catch((err) =>{
    console.log(`failed to connect with database: ${err}`)
});
module.exports = mongoose.connection;