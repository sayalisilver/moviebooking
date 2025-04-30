const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userid: { type: Number, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true },
  contact: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' },
  isLoggedIn: { type: Boolean, default: false },
  uuid: { type: String },
  accesstoken: { type: String },
  coupens: [
    {
      id: { type: Number },
      discountValue: { type: Number }
    }
  ],
  bookingRequests: [
    {
      reference_number: { type: Number },
      coupon_code: { type: Number },
      show_id: { type: Number },
      tickets: [Number]
    }
  ]
});

const User = mongoose.model('User', userSchema);
module.exports = User;
