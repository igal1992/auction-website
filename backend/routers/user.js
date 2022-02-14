const express = require("express");
const Router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/user")

//a route to get all products in db
Router.get('/user/getAll', (req,res) =>{
    User.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        res.send(err)
    })
});

//add new product to db based on sent params
Router.post('/user/addNew',(req,res)=>{
    var email = req.body.newUser.email;
    var fullName = req.body.newUser.fullName;
    bcrypt.hash(req.body.newUser.password,10,function(err,hashedPass){
        if(err){
            res.status(400).json({
                error:err
            })
        }
        User.find({email:req.body.newUser.email})
        .then((result)=>{
            if(result.length === 0){
                const newUser = new User({
                    email:email,
                    fullName:fullName,
                    password:hashedPass,  
                })
                newUser.save();
                res.status(200).json({message:"User Added Successfully!"});
            }else{
                res.status(400).json({message:"User exists already!"});
            }
        }).catch((err)=>{
            res.status(400).json({message:"An Error occured!"});
        })
    })
})

Router.post('/user/login',(req,res)=>{
    User.findOne({email:req.body.user.email})
        .then((user)=>{
            if(user){
                bcrypt.compare(req.body.user.password,user.password,function(err,result){
                    if(err){
                        res.status(400).json({
                            error:err
                        })
                    }
                    if(result){
                        const token = jwt.sign({user},'someSecret',{expiresIn:300});
                        res.status(200).json({message:'Login successfully!',auth:true,token:token});
                    }else{
                        res.status(404).json({message:'Password does not match!'});
                    }
                })
            }else{
                res.status(404).json({message:'No user found!'});
            }
        }).catch((err)=>{
            res.status(400).json({message:"An Error occured!"});
        })
})
module.exports = Router;