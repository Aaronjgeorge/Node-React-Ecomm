const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  address1: {
    type: String,
    required: true
  },
  address2: {
    type: String,
    required: true
  },
  postcode:{
    type: Number,
    required:true
  },
  state:{
      type: String,
      required: true
  },
products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ],
user: 
  {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }

}
);

module.exports = mongoose.model('Order', orderSchema);