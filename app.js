const express = require('express');
const bodyParser = require('body-parser');
const ejs = require('ejs');
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

// <------------- MONGOOSE SPECIFIC CODE ------------->

mongoose.set("strictQuery", false);
mongoose.connect("mongodb://127.0.0.1:27017/hireUpDB", { useNewUrlParser: true })
    .then(() => {
        console.log("Sucessfully Connected to DataBase");
    });


const expertSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobileNo: Number,
    password: String,
    profileDescription: String,
    profession: String,
    rate: Number,
    rating: String,
})

const expertModel = mongoose.model('Expert', expertSchema);

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    mobileNo: Number,
    password: String
})

const userModel = mongoose.model('User', userSchema);

const adminUser = new userModel({
    email: 'admin@1.com',
    password: 'Admin@123'
})

// adminUser.save();

// <------------- EXPRESS SPECIFIC CODE ------------->


app.get('/', (req, res) => {
    res.render('index')
})

app.get('/ulogin', (req, res) => {
    res.render('ulogin');
})

app.get('/plumber', (req, res) => {
    res.render('plumber');
})

app.get('/carpenter', (req, res) => {
    res.render('carpenter');
})

app.get('/elogin', (req, res) => {
    res.render('elogin');
})

app.get('/about', (req, res) => {
    res.render('about');
})

app.get('/redirect', (req, res) => {
    res.render('redirect');
})

app.get('/elogin', (req, res) => {
    res.render('elogin');
})

app.post('/ulogin', async (req, res) => {
    const userEmail = req.body.ulemail;
    const userPassword = req.body.ulpassword;

    const userData = await userModel.findOne({ email: userEmail });
    const userName = userData.name;

    if (userData.email === userEmail) {
        if (userData.password === userPassword) {
            res.render('home', { userNameEJS: userName });
        }
    }

})

app.listen(80, (req, res) => {
    console.log('Server started on Port 80');
})