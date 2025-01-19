const router = require("express").Router();
const{createAccount,deleteAccount,updateAccount} = require("../controllers/account-Controller");
const isLoggedIn = require("../middlewares/auth");
// create  account
router.post("/",isLoggedIn,createAccount)
// end 
// update account 
router.put("/:id",isLoggedIn,updateAccount)
// end 

// delete route 
router.delete("/:id",isLoggedIn,deleteAccount)
// end 
module.exports = router;