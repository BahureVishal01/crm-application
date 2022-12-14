/**
 * This file will contain the custom middleware for 
 * varifying the request body
 */

 const User = require("../models/user.model")
 const constant = require("../utils/constants");
 
 validateSignupRequest = async (req,res, next) =>{
     //Validate if userName exists
     if(!req.body.name){
         return res.status(400).send({
             message : "Failed !  User name is not provided."
         })
     }
 
     //Validate if the userId exists
     if(!req.body.userId){
         return res.status(400).send({
             message : "Failed !  UserId is not provided."
         })
     }
 
     /**
      * Validate if the userId is already not preset
      */
     const user = await User.findOne({userId : req.body.userId});
 
     if(user!=null){
         return res.status(400).send({
             message : "Failed !  User Id already exists."
         })
     }
 
     if(!req.body.email){
         return res.status(400).send({
             message : "Failed !  User email id is not provided."
         })
     }
 
     /**
      * if the email id is already existing
      */
 
     const email = await User.findOne({email : req.body.email});
     if(email!=null){
         return res.status(400).send({
             message : "Failed ! User email Id already exists."
         }) 
     }
 
     if(!req.body.password){
         return res.status(400).send({
             message : "Failed !  User password is not provided."
         })
     }
 
     /**
      * Validation for the use type
      * customer : "CUSTOMER",
         admin : "ADMIN",
         engineer
      */
     const userType = req.body.userType ;
     const userTypes = [ constant.userTypes.customer , constant.userTypes.admin, constant.userTypes.engineer]
     if(userType && !userTypes.includes(userType)){
         return res.status(400).send({
             message : "Failed !  User type is not correctly provided."
         })
     }
   
     next(); 
 }
 
 module.exports = {
     validateSignUpRequest : validateSignupRequest
 }