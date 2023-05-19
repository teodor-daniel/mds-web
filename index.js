const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://teobalan79:7979@cluster0.k2czhub.mongodb.net/?retryWrites=true&w=majority", {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

// const User = require('./models/User');
// async function saveUser() {
//   let user = new User({  
//     name: "John Doe",
//     email: "johndoe@example.com",
//     password: "password123",
//   });
//   await user.save();
//   User.find({}).then((users) => console.log(users));
// }

// saveUser();

//Routes
app.use('/', require('./routes/login'));

const PORT = process.env.PORT || 4111;
app.listen(PORT, console.log("Server has started at port " + PORT))
