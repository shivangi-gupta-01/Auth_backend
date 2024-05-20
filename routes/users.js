var express = require('express');
const User = require('../modals/userModel');
var router = express.Router();
const jwt = require('jsonwebtoken');
const sendMail = require('./sendMail');
const { hashPassword, comparePasswords } = require('../config/bcrypt');

router.post('/signup', async (req, res, next) => {
  
    const password = await hashPassword(req.body.password);
    const newUser = new User({
      Email: req.body.email,
      Name: req.body.name,
      Password: password,
      Age: req.body.age,
      Location: req.body.location,
      Department: req.body.department,
      Position: req.body.position
    })
    await newUser.save();
    const user = await User.findOne({ Email: req.body.email });
    return res.send({ token: jwt.sign({ token: user._id }, "Autho", { expiresIn: '7d' }), data: user });  
});


router.post('/otp', async (req, res, next) => {
  try {
    const user = await User.findOne({ Email: req.body.email });
    if(!user){
      const email = req.body.email;
      const min = 1000;
    const max = 9999;
    const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    sendMail(email, randomNumber);
    res.send({ randomNumber: randomNumber });
    }
    else{
      res.send("Email already exists!")
    }    
  } catch (error) {
    res.send("Otp doesnt match");
  }
}
);

router.post('/login', async function (req, res, next) {
  try {
    const user = await User.findOne({ Email: req.body.email });

    if (user) {
      const match = await comparePasswords(req.body.password, user.Password);

      if (match) {
        const token = jwt.sign({ token: user._id }, "Autho", { expiresIn: '7d' });
        res.send({ token, data: user });
      }
      else res.send("Password doesn't match");
    }
    else {
      res.send("User doesnt exists")
    }
  } catch (error) {
    res.send("This email doesn't exists")
  }
});

router.get('/fetch/:token', async function (req, res, next) {
  try {
    const decoded = jwt.verify(req.params.token, "Autho");
    const user = await User.findById(decoded.token);
    if (user) {
      res.json(user);
    }
    else {
      res.send("Invalid token");
    }
  } catch (error) {
    res.send("Request failed, try again")
  }
});

module.exports = router;
