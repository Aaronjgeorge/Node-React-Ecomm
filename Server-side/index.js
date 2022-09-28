const path = require('path');

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const multer = require('multer');
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin');
const errorController = require('./controllers/error');//importing the error controller for the 404 page

const app = express();

app.use(express.urlencoded({extended: true}));
app.use(express.json())

const fileStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'images');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
  }
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === 'image/png' ||
    file.mimetype === 'image/jpg' ||
    file.mimetype === 'image/jpeg'
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

app.use(multer({ storage: fileStorage, fileFilter: fileFilter }).single('image'));
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'OPTIONS, GET, POST, PUT, PATCH, DELETE'
    );
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization'); //this authorization header is  required for json web tokens
    next();
  });

  app.use('/auth', authRoutes);
  app.use('/admin', adminRoutes);



  // app.use(errorController.get404);
  // app.get('/500', errorController.get500); //This requires a url path unlike 404 because 404 applies to all undefined urls
  
  
  // app.use((error, req, res, next) => { //this is a special middleware that renders the 500 status code error page because we passed in the error parameter in next in our controllers in admin and auth.js for error handling. This executes only in cases of database failures and such
  //   // res.status(error.httpStatusCode).render(...);
  //   // res.redirect('/500');
  //   res.status(500).render('500', {
  //     pageTitle: 'Error!',
  //     path: '/500',
  //     isAuthenticated: req.session.isLoggedIn
  //   });
  // });
  
  mongoose
    .connect(
      'mongodb+srv://Kalibacardi:F1IZrDPqUthodVXE@cluster0.mmzqe.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-hkl5dw-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true'
    )
    .then(result => {
      app.listen(8080);
    })
    .catch(err => console.log(err));
  