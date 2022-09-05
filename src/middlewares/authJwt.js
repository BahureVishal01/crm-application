const jwt = require("jsonwebtoken");
const config = require("../configs/auth.config");
const User = require("../models/user.model");
const constants = require("../utils/constants");


// Authentication of token
verifyToken = (req, res, next)=>{
  /**
   * read the token from the header
   */
  const token = req.headers['x-access-token'];
  if(!token){
    return res.status(403).send({
      message: "No Token provided."
    })
  }
  // If the token was provided, we need to verify it.
  jwt.verify(token, config.secrect, (err, decoded)=>{
    if(err){
      return res.status(400).send({
        message: "Unauthorised"
      });
    }
    // we will try to read userId from the decoded token and store it in req obj.
    req.userId = decoded.id;
    next();
  })
}
/**
 * if the passed access token is of admin or not
 * 
 */
isAdmin = async (req, res, next)=>{
  /**
   * Fetch user from db using the userid
   */
  const user = await User.findOne({userId: req.userId});
  /**
   * check what is the userType
   */
  if(user && user.userType == constants.userTypes.admin){
    next();
  }else{
    res.status(403).send({
      message: "Requires ADMIN role"
    })
  }
}
 const authJwt = {
  verifyToken:verifyToken,
  isAdmin: isAdmin
 };
 module.exports = authJwt;