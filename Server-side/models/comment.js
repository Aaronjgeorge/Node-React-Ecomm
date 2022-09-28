const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  text: {
    type: String,
    required: true
  },
  date:{
    type: String,
    required:true
  },
  user: [
    {
      type: Schema.Types.ObjectId,
      ref: 'User'
    }
  ],
product: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product'
    }
  ]
}
);

module.exports = mongoose.model('Comment', commentSchema);