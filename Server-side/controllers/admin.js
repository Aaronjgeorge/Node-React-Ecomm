const fs = require('fs');
const path = require('path');

const { validationResult } = require('express-validator/check');
const Product = require('../models/product');
const Comment = require('../models/comment')
const User = require('../models/user');
const mongoose = require('mongoose');
const Cart = require("../models/cart");
const Order = require("../models/order");

// const Cart = require("../models/cart");







exports.getProducts = async (req, res, next) => {
  // const currentPage = req.query.page || 1;
  // const perPage = 2;
  try {
    // const totalItems = await Post.find().countDocuments();
    const Products = await Product.find()
    //   console.log(comments)
    // })
      // .populate('creator')
      // .sort({ createdAt: -1 })
      // .skip((currentPage - 1) * perPage)
      // .limit(perPage);

    res.status(200).json({
      message: 'Fetched posts successfully.',
      Products: Products,
      // totalItems: totalItems
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};


exports.AddProduct = async (req, res, next) => {
  console.log("title",req.body.title,"price",req.body.price,"description",req.body.description,"image",req.body.image,req.body.userId)
    const errors = validationResult(req);
    console.log(errors)
    if (!errors.isEmpty()) {
      const error = new Error('Validation failed, entered data is incorrect.');
      error.statusCode = 422;
      throw error;
    }
    if (!req.file) {
      const error = new Error('No image provided.');
      error.statusCode = 422;
      throw error;
    }
    const imageUrl = req.file.path;
    const price = req.body.price
    const title = req.body.title;
    const description = req.body.description;
    const userId = req.body.userId
    const productt = new Product({
      title: title,
      description: description,
      price:price,
      imageUrl: imageUrl,
      user: userId
    });
    try {
      await productt.save();
      console.log(productt);
      const userr= await User.findById(userId);
      console.log(userr)
      userr.products.push(productt)
      await userr.save()
      // const user = await User.findById(req.userId);
      // user.posts.push(post);
      // await user.save();
      res.status(201).json({
        message: 'Product created successfully!',
        products: productt,
        // creator: { _id: user._id, name: user.name }
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

  exports.AddComment = async (req, res, next) => {
    // const errors = validationResult(req);
    // console.log(errors,"error log")
    // if (!errors.isEmpty()) {
    //   const error = new Error('Validation failed, entered data is incorrect.');
    //   error.statusCode = 422;
    //   throw error;
    // }
    // if (!req.file) {
    //   const error = new Error('No image provided.');
    //   error.statusCode = 422;
    //   throw error;
    // }
    // const imageUrl = req.file.path;
    const title = req.body.title;
    const text = req.body.text;
    const date = req.body.date;
    const user = mongoose.Types.ObjectId(req.body.user);
    console.log(user)
    const prodId = req.body.prodId;
    const commentt = new Comment({
      title: title,
      text: text,
      date: date,
      user: user,
      product: prodId
      // imageUrl: imageUrl,
    //   creator: req.userId
    });
    try {
      await commentt.save();
      console.log(commentt);
      const product= await Product.findById(prodId);
      console.log(product)
      product.comment.push(commentt)
      await product.save()
      // const user = await User.findById(req.userId);
      // user.posts.push(post);
      // await user.save();
      res.status(201).json({
        message: 'Post created successfully!',
        comment: commentt,
        // creator: { _id: user._id, name: user.name }
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

  exports.getProduct = async (req, res, next) => {
    const productId = req.params.productId;
    console.log(productId)
    const Productinfo = await Product.findById(productId).populate({path: 'comment',model: 'Comment', populate: [{path: 'user',model: User}]});
    // const Commentinfo = await Productinfo.comment.populate('user');
    console.log(Productinfo)
    // console.log(Commentinfo)
    const t = new Date();
    const time = t.getTime()
    // console.log("test")
    // .exec((err,comments)=>{
;
    try {
      if (!Productinfo) {
        const error = new Error('Could not find post.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'Product fetched.', Productinfo: Productinfo,time: time });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };

  exports.getProfile = async (req, res, next) => {
    const userId = req.params.userId;
    console.log(userId)
    const userInfo = await User.findById(userId)
    console.log(userInfo)
    // .populate('comment')
    // .exec((err,comments)=>{
;
    try {
      if (!userInfo) {
        const error = new Error('Could not find user.');
        error.statusCode = 404;
        throw error;
      }
      res.status(200).json({ message: 'User fetched.', userInfo: userInfo });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  }; 

let cart1 = async (userId) => {
  console.log("THIS IS USER ID "+userId)
  const carts = await Cart.findOne({user: userId})
  try{
    if(carts){
    console.log("CART FINDING IS OVER")
    console.log("This is "+carts)
    return carts;}
  else{

    console.log("Cart could not be found")
  }
  }
    catch{
      console.log("Failed")
    }
};
let addItem = async (id,payload) => {
  console.log(id)
    const newItem = new Cart({user: id,items: payload.items});
    await newItem.save();
    return newItem
}

    
    exports.addItemToCart = async (req, res) => {
        const productId =  mongoose.Types.ObjectId(req.body.productId)
        const userId = mongoose.Types.ObjectId(req.body.userId)
        const quantity = req.body.quantity;
        console.log(userId+" "+productId+" "+quantity)
        try {
            let cart = await cart1(userId);
            console.log("THIS IS CART "+cart)
            let productDetails = await Product.findById(productId);
            console.log("THIS IS PRODUCT "+productDetails)
                 if (!productDetails) {
                return res.status(500).json({
                    type: "Not Found",
                    msg: "Invalid request"
                })
            }
            //--If Cart Exists ----
            if (cart) {
                //---- check if index exists ----
                console.log("THIS IS CART gkuyu")
                console.log(cart.items)
                const indexFound = cart.items.findIndex(item => {

                  if(item.productId.toString() === productId.toString()){
                  return item}
                });
                console.log(indexFound)
                //------this removes an item from the the cart if the quantity is set to zero,We can use this method to remove an item from the list  -------
                if (indexFound !== -1 && quantity == 0) {
                    cart.items.splice(indexFound, 1);
                    if (cart.items.length == 0) {
                        cart.subTotal = 0;
                    } else {
                        cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                    }
                }
                //----------check if product exist,just add the previous quantity with the new quantity and update the total price-------
                else if (indexFound !== -1) {
                  console.log("!== =1")
                    cart.items[indexFound].quantity = cart.items[indexFound].quantity + quantity;
                    cart.items[indexFound].total = cart.items[indexFound].quantity * productDetails.price;
                    cart.items[indexFound].price = productDetails.price
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //----Check if Quantity is Greater than 0 then add item to items Array ----
                else if (quantity > 0) {
                  console.log("!== =1123")

                    cart.items.push({
                        productId: productId,
                        quantity: quantity,
                        price: productDetails.price,
                        total: parseInt(productDetails.price * quantity)
                    })
                    cart.subTotal = cart.items.map(item => item.total).reduce((acc, next) => acc + next);
                }
                //----if quantity of price is 0 throw the error -------
                else {
                    return res.status(400).json({
                        type: "Invalid",
                        msg: "Invalid request"
                    })
                }
                let data = await cart.save();
                res.status(200).json({
                    type: "success",
                    mgs: "Process Successful",
                    data: data
                })
            }
            //------------ if there is no user with a cart...it creates a new cart and then adds the item to the cart that has been created------------
            else {
                const cartData = {
                    items: [{
                        productId: productId,
                        quantity: quantity,
                        total: parseInt(productDetails.price * quantity),
                        price: productDetails.price
                    }],
                    subTotal: parseInt(productDetails.price * quantity)
                }
                cart = await addItem(userId,cartData)
                // let data = await cart.save();
                res.json(cart);
            }
        } catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalid",
                msg: "Something Went Wrong",
                err: err
            })
        }
    }
    exports.getCart = async (req, res) => {
      console.log("runinign")
        const userId = mongoose.Types.ObjectId(req.params.userId);
        console.log(userId)
        try {
          const carts = await Cart.findOne({user: userId}).populate({path: 'items', populate: [{path: 'productId', model: Product}]});
            if (!carts) {
                return res.status(400).json({
                    type: "Invalid",
                    msg: "Cart Not Found",
                })
            }
            res.status(200).json({
                status: true,
                data: carts
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalid",
                msg: "Something Went Wrong",
                err: err
            })
        }
    }
    
    exports.emptyCart = async (req, res) => {
        try {
            let cart = await cart1();
            cart.items = [];
            cart.subTotal = 0
            let data = await cart.save();
            res.status(200).json({
                type: "success",
                mgs: "Cart Has been emptied",
                data: data
            })
        } catch (err) {
            console.log(err)
            res.status(400).json({
                type: "Invalid",
                msg: "Something Went Wrong",
                err: err
            })
        }
    }

exports.placeOrder = async(req,res)=>{
  let address1 = req.body.address1;
  let address2 = req.body.address2;
  let post = req.body.post;
  let state = req.body.statename;
  let oprod = req.body.products
  let prod = []
  oprod.map(item=>{
    prod.push(item._id)
  })
  const user = mongoose.Types.ObjectId(req.body.user);
  const order = new Order({
    address1: address1,
    address2:address2,
    postcode: post,
    state: state,
    products: prod,
    user: user
    // imageUrl: imageUrl,
  //   creator: req.userId
  });
  try{
    await order.save();
    res.status(200).json({
      message: 'Order placed successfully',
    });

  }catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
  }