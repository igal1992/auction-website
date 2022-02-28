const express = require("express");
const Router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require("../models/user");

const verifyJWT = (req,res,next)=>{
    const token = req.headers["x-access-token"]
    if(!token){
        res.status(400).send("it seems you are'nt logged in please log in and try again");
    }else{
        jwt.verify(token, "someSecret", (err,decoded)=>{
            if(err){
                res.status(400).send('you failed to authenticate');
            }else{
                req.userId = decoded.id;
                next();
            }
        })
    }
}
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

//delete route based on received email of account 
Router.post('/user/delete',(req,res)=>{
    var userEmail = req.body.emailToRemove;
    User.find({email:userEmail}).deleteOne().exec()
    .then((result) => res.send("user removed"))
    .catch((err) => res.send(err))
})

//add new account to db based on sent params
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

//edit route based on received email of email
Router.post('/user/edit',(req,res)=>{
    var userEmail = req.body.newAccount.emailToEdit;
    var email = req.body.newAccount.email;
    var fullName = req.body.newAccount.fullName;
    User.find({email:userEmail}, (err,doc)=>{
        if(doc[0]!==undefined){
            doc[0].email=email;
            doc[0].fullName=fullName;
            doc[0].save();
            res.send("user edited");
        }else{
            res.sendStatus(400);
        }
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

Router.get('/user/userAuth',verifyJWT,(req,res)=>{
    res.send('auth approved');
});
Router.post('/user/getData',(req,res)=>{
    User.findOne({email:req.body.email})
        .then(user=>{
            if(user){
                const userToReturn = {
                    email:user.email,
                    fullName:user.fullName
                }
                res.status(200).send(userToReturn);
            }else{
                res.status(404).send("cant find user");
            }
        }).catch(err=>{
            res.status(400).send(err);
        })
})

module.exports = Router;