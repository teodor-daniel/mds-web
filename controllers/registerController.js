const User = require('../models/User');
const hash = require('hash.js');

const registerView = (req, res) => {

  res.render('register.ejs'); 
};

const doRegister = async (req, res) => {
  try {

    const username = req.body.username;
    const password = req.body.password;
    const retypepassword = req.body.retypepassword;

    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.send('<script>alert("Username already exists"); window.location.href="/register";</script>');
    }

    if (password !== retypepassword) {
      return res.send('<script>alert("Password does not match"); window.location.href="/register";</script>');
    }

    const hashedPassword = hash.sha256().update(password).digest('hex');

    const user = new User({ username, password: hashedPassword });

    await user.save();

    res.send('<script>alert("User registered successfully"); window.location.href="/login";</script>');
  } catch (error) {
    console.error('Error registering user:', error);
    res.send('<script>alert("Internal server error"); window.location.href="/register";</script>');
  }
};

module.exports = { registerView, doRegister };
