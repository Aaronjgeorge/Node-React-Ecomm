const { validationResult } = require('express-validator/check');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const sendConfirmationEmail = require('../middleware/sendConfirmationEmail');

exports.signup = async (req, res, next) => {
  const errors = validationResult(req);
  console.log(errors)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed.');
    error.statusCode = 422;
    error.data = errors.array();
    throw error;
  }
  const email = req.body.email;
  const name = req.body.name;
  const password = req.body.password;
  console.log(email,name,password)
  try {
    const hashedPw = await bcrypt.hash(password, 12);

    const user = new User({
      email: email,
      password: hashedPw,
      name: name,
      imageUrl: ''
    });
    const result = await user.save();
    await sendConfirmationEmail({toUser: email,hash:result._id})
    res.status(201).json({ message: 'User created!', userId: result._id });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
};





exports.activateUser = async (req, res) => {
  const {hash} = req.params;
  try {
    const user = await User.findById(hash);
    user.confirmed = !user.confirmed;
    await user.save();
    res.redirect("http://localhost:3000")
    res.json({message: `User ${hash} has been activated`})
  } catch {
    res.status(422).send('User cannot be activated!');
  }
}


exports.login = (req, res, next) => {
  const email = req.body.email;
  const password = req.body.password;
  console.log(email,password)
  let loadedUser; //to store the matched user in the database
  User.findOne({ email: email })
    .then(user => {
      if (!user) { //if user doesnt exist
        const error = new Error('A user with this email could not be found.');
        error.statusCode = 401;
        throw error;
      }
      loadedUser = user;
      return bcrypt.compare(password, user.password); //compare hashed p[asswords]
    })
    .then(isEqual => {
      if (!isEqual) {
        const error = new Error('Wrong password!');
        error.statusCode = 401;
        throw error;
      }
      if(loadedUser.confirmed == true){
      const token = jwt.sign( //this creates a new signature and stores it as a web token
        {
          email: loadedUser.email,
          userId: loadedUser._id.toString()
        },
        'abcd122432', //this is the signature
        { expiresIn: '1h' }
      );
      res.status(200).json({ token: token, userId: loadedUser._id.toString() , email: loadedUser.email});}
      else{
        res.status(401).json({Message: "User has not confirmed his email"})
      }
    })
    .catch(err => {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    });
};

exports.updateProfile = async (req, res, next) => {
  console.log("name",req.body.name,"email",req.body.email,"password",req.body.password,"image",req.file.path,req.body.userId)
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
    const name = req.body.name
    const email = req.body.email;
    const password = req.body.password;
    const userId = req.body.userId
    try {
      const user = await User.findById(userId);
      if(user.password === password){
        user.password=password;
      }else{
        const hashedPw = await bcrypt.hash(password, 12);
        user.password = hashedPw;
      }
      user.name =name;
      user.email=email;
      user.imageUrl = imageUrl;
      await user.save();
      console.log(user)
      // const user = await User.findById(req.userId);
      // user.posts.push(post);
      // await user.save();
      res.status(201).json({
        message: 'user updated successfully!',
        User: user,
        // creator: { _id: user._id, name: user.name }
      });
    } catch (err) {
      if (!err.statusCode) {
        err.statusCode = 500;
      }
      next(err);
    }
  };


  exports.verifyUser = async (req, res, next) => {
    const authHeader = req.get('Authorization'); //gets the stored token from the authorization header
    console.log(authHeader)
    console.log("This is it")
    if (!authHeader) {
      const error = new Error('Not authenticated.'); //if no header is found user will be unauthenticated
      error.statusCode = 401;
      throw error;
    }
    console.log(authHeader)
    const token = authHeader.split(' ')[1];  
    let decodedToken;
    try {
      decodedToken = jwt.verify(token, 'abcd122432'); //the verify function checks and verifies the token with the signature given on auth.js controller
    } catch (err) {
      err.statusCode = 500; //if it cannot be verified due to some error
      console.log("this is being thrown")
      throw err;
    }
    if (!decodedToken) {
      const error = new Error('Not authenticated.'); //if token cannot be decoded means its not a server generated token and hence user remains unathenticated
      error.statusCode = 401;
      throw error;
    }
    req.userId = decodedToken.userId; //userId from the token is set as the useId in the request to make it easier to verify which users can delete posts
    res.status(200).json({
      message: 'Fetched posts successfully.'
      // totalItems: totalItems
    });
    next();
  };

