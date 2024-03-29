// User model
const UserModel = require("../models/User");

// Controllers
const loginView = (req, res) => { 
    if (req.session.user != null)
        return res.redirect('/dashboard');

    res.render("login", {})
};

const doLogin = (req, res) => {
    if (req.session.user != null)
        return res.redirect('/dashboard');

    const username = req.body.username, password = req.body.password;

    const hash = require('hash.js');
    let hashedPassword = hash.sha256().update(password).digest("hex");

    UserModel.findOne({ username: username, password: hashedPassword }, (err, user) => {
        if (err) {
            res.render("login", { error: err });
        } else {
            if (user) {
                req.session.user = user;
                res.redirect('/dashboard');
            } else {
                res.render("login", { error: "Invalid username or password!" });
            }
        }
    });
}

module.exports =  {
    loginView,
    doLogin
};