require('dotenv').config();
const express = require ("express");
const userRouter = express.Router();
const passport = require("passport");
const passportConfig = require("../passport");
const JWT = require("jsonwebtoken");
const User = require("../models/UserDB.js");
const Product = require("../models/ProductDB.js");



const secretKey = "MySecretKey";


const signToken = userID=>{
    return JWT.sign({
        iss:"Ecom",
        sub: userID
    }, secretKey,{expiresIn:"24h"});
}


userRouter.post("/register", (req,res)=>{
    const {username, password, fullName, role} = req.body;

    User.findOne({username},(err, user)=>{
        if(err)
            res.status(500).json({message : {msgBody: "Error has been occured in 1st one", msgError:true}});
        if(user)
            res.status(400).json({ message: { msgBody: "Username is already taken", msgError: true } });
        else{
            const newUser = new User({username, password, fullName, role});
            newUser.save(err=>{
                if(err)
                    res.status(500).json({ message: { msgBody: "Error has been occured in second one", msgError: true } });
                else
                    res.status(201).json({ message: { msgBody: "Account succesfully created, please login to continue.", msgError: false } });

            });
        }
        
        
    });
});

userRouter.post("/login",passport.authenticate("local",{session:false}), (req, res) => {
    
    const {_id, username, fullName, role } = req.user;

    if (req.isAuthenticated()) {
        const token = signToken(_id);
        res.cookie("access_token", token, { httpOnly: true, sameSite:'None', secure:true});
        res.status(200).json({ isAuthenticated: true, user: { username, fullName, role } });
    }
});


userRouter.get("/logout", passport.authenticate("jwt", { session: false }), (req, res) => {
    res.clearCookie("access_token", { httpOnly: true, sameSite:'None', secure:true});
    res.json({user:{username : "", isAuthenticated:false}, success:true});
});

userRouter.post("/addProduct",(req, res) => {
    
    const product = new Product(req.body);
    product.save(err=>{
        if(err){
            res.status(500).json({ message: { msgBody: "Please Enter Details Properly", msgError: true } });
        }else{
            res.status(200).json({ message: { msgBody: "successfully added product", msgError: false } });
        }
        
    })
       
})

userRouter.get("/getProduct",  (req, res) => {

    Product.find({}, (err, data)=>{
        if(err){
            res.status(500).json({ message: { msgBody: "Error has been occured", msgError: true } });
        }else{
            res.status(200).json({success:true, data});
        }
    })
});


userRouter.put("/updateProduct/:id", (req, res)=>{

    const data=req.body;

    Product.findByIdAndUpdate(req.params.id,data,(err)=>{
        if (err)
            res.status(500).json({ message: { msgBody: "Error has been occured", msgError: true } });
        else {
            res.status(200).json({ messagse: "Successfully Updated"});
        }
    }) 
})

userRouter.delete("/deleteProduct/:id", (req, res) => {

    Product.findByIdAndDelete(req.params.id, (err)=>{
        if (err)
            res.status(500).json({ message: { msgBody: "Error has been occured", msgError: true } });
        else {
            res.status(200).json({ messagse: "Successfully Deleted"});}})
    
});



userRouter.get("/authenticated", passport.authenticate("jwt", { session: false }), (req, res, err) => {
    
    const {username, fullName, role} = req.user;
    res.status(200).json({isAuthenticated:true, user:{username, fullName, role}});

});



module.exports = userRouter;

