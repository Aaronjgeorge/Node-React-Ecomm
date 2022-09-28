const express = require('express');
const { body } = require('express-validator/check');

const adminController = require('../controllers/admin');
const isAuth = require('../middleware/is-auth');


const router = express.Router();

router.get(
  '/get-products',
  // isAuth,
  adminController.getProducts
);

router.get(
  '/get-product/:productId',
  // isAuth,
  adminController.getProduct
);

router.get(
  '/getProfile/:userId',
  isAuth,
  adminController.getProfile
);


router.post(
    '/add-product',
    isAuth,
    [
      body('title') //check the request body for a title field and chained functions check and modify according to our needs
        .isString()
        .isLength({ min: 3 })
        .trim(),
      body('price').isFloat(),
      body('description')
        .isLength({ min: 5, max: 400 })
        .trim()
    ],
    adminController.AddProduct
  );

  router.post(
    '/add-comment'
    ,isAuth
    ,adminController.AddComment
  );

  router.post("/add-cart",isAuth,adminController.addItemToCart);
  router.get("/cart/:userId",isAuth, adminController.getCart);
  router.delete("/empty-cart",isAuth, adminController.emptyCart);
  router.post("/place-order",isAuth, adminController.placeOrder);



  module.exports = router;