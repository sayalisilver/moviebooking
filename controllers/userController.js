const User = require('../models/userModel');
const TokenGenerator = require('uuid-token-generator');
const uuidv4 = require('uuidv4');
const b2a = require('b2a'); 
const tokgen = new TokenGenerator();

// ---------------- SIGN UP ------------
exports.signUp = async (req, res) => {
  try {
    const {
        email_address: email,
        first_name,
        last_name,
        mobile_number: contact,
        password
      } = req.body;
      

    const username = `${first_name}${last_name}`;

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists with this email' });
    }

    const newUser = new User({
      userid: Math.floor(Math.random() * 100000),
      email,
      first_name,
      last_name,
      username,
      contact,
      password, 
      role: 'user',
      isLoggedIn: false,
      uuid: uuidv4.uuid(),
      accesstoken: tokgen.generate()
    });

    await newUser.save();
    res.status(201).json({ message: 'User created successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Signup failed', error: err.message });
  }
};

// ---------------- LOGIN ----------------
exports.login = async (req, res) => {
    try {
      const authHeader = req.headers.authorization;
  
      if (!authHeader || !authHeader.startsWith("Basic ")) {
        return res.status(401).json({ message: "Missing or invalid authorization header" });
      }
  
      const base64Credentials = authHeader.split(" ")[1];
      const credentials = Buffer.from(base64Credentials, "base64").toString("ascii");
      const [username, password] = credentials.split(":");
  
      const user = await User.findOne({ username, password });
  
      if (!user) {
        return res.status(401).json({ message: "Invalid credentials" });
      }
  
      user.isLoggedIn = true;
      user.accesstoken = tokgen.generate();
      await user.save();
  
      res
        .status(200)
        .header("access-token", user.accesstoken)
        .json({
          message: "Login successful",
          id: user.uuid,
          accesstoken: user.accesstoken
        });
    } catch (err) {
      res.status(500).json({ message: "Login failed", error: err.message });
    }
  };
  

// ---------------- LOGOUT ----------------
exports.logout = async (req, res) => {
  try {
    const { uuid } = req.body;

    const user = await User.findOne({ uuid });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    user.isLoggedIn = false;
    user.accesstoken = '';
    await user.save();

    res.status(200).json({ message: 'User logged out successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Logout failed', error: err.message });
  }
};
//------------------ GET COUPON ------

exports.getCouponCode = async (req, res) => {
    try {
      const { uuid } = req.query;
  
      const user = await User.findOne({ uuid });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      res.status(200).json({ coupons: user.coupens });
    } catch (err) {
      res.status(500).json({ message: 'Failed to fetch coupons', error: err.message });
    }
  };
  
  //--book show

  exports.bookShow = async (req, res) => {
    try {
      const { customerUuid, bookingRequest } = req.body;
  
      const user = await User.findOne({ uuid: customerUuid }); // find by uuid
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      user.bookingRequests.push(bookingRequest);

      // adding coupons 
      const couponExists = user.coupens.some(c => c.id === bookingRequest.coupon_code);
      
      if (!couponExists && bookingRequest.coupon_code) {
        user.coupens.push({
          id: bookingRequest.coupon_code,
          discountValue: bookingRequest.coupon_code 
        });
      }
  
      await user.save();
  
      res.status(201).json({
        message: 'Booking successful',
        reference_number: bookingRequest.reference_number || null
      });
    } catch (err) {
      res.status(500).json({ message: 'Booking failed', error: err.message });
    }
  };

  