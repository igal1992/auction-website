const express = require("express");
const Router = express.Router();
const Product = require("../models/product")

//a route to get all products in db
Router.get('/product/getAll', (req,res) =>{
    Product.find()
    .then((result)=>{
        res.send(result)
    })
    .catch((err)=>{
        res.send(err)
    })
});

//add new product to db based on sent params
Router.post('/product/addNew',(req,res)=>{
    var title = req.body.title;
    var price = req.body.price;
    var description = req.body.description;
    var image = req.body.image;
    Product.find({title:req.body.title})
    .then((result)=>{
        if(result.length === 0 && price !== ""&& description !== ""&& image !== ""){
            const product = new Product({
                title:title,
                price:price,
                description:description,
                image:image
            })
            product.save();
            res.send("product added")
        }else{
            res.sendStatus(400)
        }
    }).catch((err)=>{
        res.sendStatus(400);
    })
})

//delete route based on received title of product 
Router.post('/product/delete',(req,res)=>{
    var productTitle = req.body.title;
    Product.find({title:productTitle}).deleteOne().exec()
    .then((result) => res.send("product removed"))
    .catch((err) => res.send(err))
})

//edit route based on received title of product
Router.post('/product/edit',(req,res)=>{
    var productTitle = req.body.titletoEdit;
    var title = req.body.title;
    var price = req.body.price;
    var description = req.body.description;
    var image = req.body.image;
    Product.find({title:productTitle}, (err,doc)=>{
        if(doc[0].length != 0 && price !== ""&& description !== ""&& image !== ""){
            doc[0].title=title;
            doc[0].price=price;
            doc[0].description=description;
            doc[0].image=image;
            doc[0].save();   
            res.send("product edited")
        }else{
            res.sendStatus(400);
        }
    })
})
module.exports = Router;