const { resgisterUser,loginUser,logoutUser,getAllAccount } = require("../controllers/user-Controller");
const isLoggedIn = require("../middlewares/auth");

const router = require("express").Router();

// get all acoount 
router.get("/accounts",isLoggedIn,getAllAccount);
// create register route 
router.post("/create",resgisterUser)
// end 
// login user 
router.post("/login",loginUser);
// end 
// logout usr
router.get("/logout",logoutUser);
 
// end 

module.exports = router;