/* -> date pentru mobil
 * 
 * Teo:
 * -> Populat DB
 * -> Icon navbar si plasat log out in dreapta (vineri)
 * -> Schimbat nume site, favicon (vineri)
 * -> Imbunatati login view (vineri)
 * -> Citire din JSON pentru store-uri si tipuri oferte (vineri)
 * -> search pe API-ul de la RAGW cand introduci numele unui joc (vineri)
 * -> QA (sambata)
 * 
 * Tudor:
 * -> implementare pe mobil (vineri)
 * -> notificari (vineri)
 * -> cronjobs (vineri)
 * -> some refactoring (sambata)
 * 
 */

const express = require('express');
var cookieParser = require('cookie-parser');
var session = require('express-session');

const app = express();

app.use(cookieParser());
app.use(session({secret: "codsupersecret"}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

const dotenv = require("dotenv");
dotenv.config();

const mongoose = require('mongoose');
mongoose.set('strictQuery', false);
mongoose.connect("mongodb+srv://teobalan79:7979@cluster0.k2czhub.mongodb.net/?retryWrites=true&w=majority", {useUnifiedTopology: true, useNewUrlParser: true })
.then(() => console.log('MongoDB Connected...'))
.catch(err => console.log(err));

//Routes
app.get('/log-out', (req, res) => {
    req.session.destroy();

    res.redirect('/login');
});

app.get(['/', '/index'], (req, res) => {
    if (req.session.user == null)
        res.redirect('/dashboard');
    else
        res.redirect('/login');
})
app.use(express.static(__dirname + '/imagini'));

app.use('/', require('./routes/dashboard'));
app.use('/', require('./routes/register'));
app.use('/', require('./routes/login'));
app.use('/', require('./routes/campaign'));

const PORT = process.env.PORT || 8080;
app.listen(PORT, console.log("Server has started at port " + PORT));
