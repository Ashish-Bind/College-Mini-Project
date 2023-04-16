const express = require('express')
const bodyParser = require('body-parser')
const ejs = require('ejs')
const mongoose = require('mongoose')

const app = express()

let userName, expertName, expertMobile, expertEmail
let userLoggedIn = false
let expertLoggedIn = false
let expertAccountCreated = false

app.set('view engine', 'ejs')
app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.static('public'))

// <------------- MONGOOSE SPECIFIC CODE ------------->

mongoose.set('strictQuery', false)
mongoose
  .connect('mongodb://127.0.0.1:27017/hireUpDB', { useNewUrlParser: true })
  .then(() => {
    console.log('Sucessfully Connected to DataBase')
  })

const expertSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobileNo: Number,
  password: String,
  availablity: String,
  profession: String,
  pincode: String,
  profileDescription: String,
  rate: Number,
})

const expertModel = mongoose.model('Expert', expertSchema)

const newExpert1 = new expertModel({
  name: 'Ashish',
  email: 'abc@g.com',
  mobileNo: 1234567890,
  password: 'Ashish@1984',
  availablity: 'Available',
  profession: 'Plumber',
  pincode: '400097',
  profileDescription: 'Very good at my work',
  rate: 200,
})

const newExpert2 = new expertModel({
  name: 'Raju',
  email: 'abc@g.com',
  mobileNo: 0000000000,
  password: 'rajubhai@1123',
  availablity: 'Not Available',
  profession: 'Plumber',
  pincode: '400001',
  profileDescription: 'Very good at my work',
  rate: 300,
})

const newExpert3 = new expertModel({
  name: 'Alom',
  email: 'alom9789@g.com',
  mobileNo: 8982363234,
  password: 'alom@Singh1984',
  availablity: 'Available',
  profession: 'Plumber',
  pincode: '400009',
  profileDescription: 'Very good at my work',
  rate: 150,
})

// newExpert1.save();
// newExpert2.save();
// newExpert3.save();

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  mobileNo: Number,
  password: String,
})

const userModel = mongoose.model('User', userSchema)

const adminUser = new userModel({
  email: 'admin@1.com',
  password: 'Admin@123',
})

// adminUser.save();

// <------------- EXPRESS SPECIFIC CODE ------------->

app.get('/', (req, res) => {
  res.render('index', { loginEJS: 'Login' })
})

app.get('/ulogin', (req, res) => {
  res.render('ulogin', { userNameEJS: 'Login' })
})

app.get('/elogin', (req, res) => {
  res.render('elogin', { userNameEJS: 'Login' })
})

app.get('/usignup', (req, res) => {
  res.render('usignup', { userNameEJS: 'Login' })
})

app.get('/esignup', (req, res) => {
  res.render('esignup', { userNameEJS: 'Login' })
})

app.get('/about', (req, res) => {
  res.render('about', { userNameEJS: 'Login' })
})

app.get('/redirect', (req, res) => {
  res.render('redirect')
})

app.get('/home/expertInfo', (req, res) => {
  if (expertLoggedIn) {
    res.render('expertInfo')
  } else {
    res.redirect('/redirect')
  }
})

app.get('/home/profile/', (req, res) => {
  if (expertLoggedIn) {
    res.render('profile')
  }
})

app.get('/home', (req, res) => {
  if (userLoggedIn == true) {
    res.render('home', { userNameEJS: userName })
  } else {
    res.redirect('/redirect')
  }
})

app.post('/usignup', async (req, res) => {
  const userSignupName = req.body.userName
  const userSignupEmail = req.body.userEmail
  const userSignupNumber = req.body.userNumber
  const userSignupPassword = req.body.userPassword

  const newUser = new userModel({
    name: userSignupName,
    email: userSignupEmail,
    mobileNo: userSignupNumber,
    password: userSignupPassword,
  })

  newUser.save().then(res.redirect('/ulogin'))
})

app.post('/esignup', async (req, res) => {
  const expertSignupName = req.body.expertName
  const expertSignupEmail = req.body.expertEmail
  const expertSignupNumber = req.body.expertNumber
  const expertSignupPassword = req.body.expertPassword

  expertName = expertSignupName
  expertEmail = expertSignupEmail
  expertMobile = expertSignupNumber

  const newExpert = new expertModel({
    name: expertSignupName,
    email: expertSignupEmail,
    mobileNo: expertSignupNumber,
    password: expertSignupPassword,
  })
  expertAccountCreated = true
  newExpert.save().then(res.redirect('/createProfile'))
})

app.post('/ulogin', async (req, res) => {
  const userEmail = req.body.ulemail
  const userPassword = req.body.ulpassword

  const userData = await userModel.findOne({ email: userEmail })
  // console.log(userData);
  userName = userData.name

  if (userData.email === userEmail) {
    if (userData.password === userPassword) {
      res.redirect('/home#services')
      userLoggedIn = true
    }
  }
})

app.post('/elogin', async (req, res) => {
  const expertEmail = req.body.elemail
  const expertPassword = req.body.elpassword

  const expertData = await expertModel.findOne({ email: expertEmail })
  // console.log(userData);
  expertName = expertData.name
  console.log(expertName);
  if (expertData.email === expertEmail) {
    if (expertData.password === expertPassword) {
      switch (expertData.profession) {
        case 'Plumber':
          res.redirect('/home/plumber')
          break
        case 'Carpenter':
          res.redirect('/home/carpenter')
          break
        case 'Electrician':
          res.redirect('/home/electrician')
          break
        case 'Painter':
          res.redirect('/home/painter')
          break

        default:
          break
      }
      expertLoggedIn = true
    }
  }
})

app.get('/createprofile', async (req, res) => {
  if (expertAccountCreated) {
    res.render('createprofile', {
      userNameEJS: expertName,
      expertNameEJS: expertName,
      expertEmailEJS: expertEmail,
      expertMobileEJS: expertMobile,
    })
  }
})

app.post('/createprofile', async (req, res) => {
  const expertAvailiblity = req.body.availablity
  const expertProfession = req.body.profession
  const expertPincode = req.body.pincode
  const expertDetail = req.body.workDetails
  const expertRate = req.body.rate

  await expertModel.updateOne(
    { name: expertName },
    {
      availablity: expertAvailiblity,
      profession: expertProfession,
      pincode: expertPincode,
      profileDescription: expertDetail,
      rate: expertRate,
    }
  )

  switch (expertProfession) {
    case 'Plumber':
      res.redirect('/home/plumber')
      break
    case 'Carpenter':
      res.redirect('/home/carpenter')
      break
    case 'Electrician':
      res.redirect('/home/electrician')
      break
    case 'Painter':
      res.redirect('/home/painter')
      break
    default:
      break
  }
})

app.post('/editprofile', async (req, res) => {
  const expertAvailiblity = req.body.availablity

  await expertModel.updateOne(
    { name: expertName },
    {
      availablity: expertAvailiblity,
    }
  )
  res.redirect('/home/plumber');
})

app.get('/home/plumber', async (req, res) => {
  const plumbers = await expertModel.find({ profession: 'Plumber' })
  const loggedInUser = userLoggedIn ? userName : expertName
  res.render('plumber', { userNameEJS: loggedInUser, allPlumberEJS: plumbers })
})

app.get('/home/carpenter', (req, res) => {
  res.render('carpenter', { userNameEJS: userName })
})

app.get('/home/electrician', (req, res) => {
  res.render('electrician', { userNameEJS: userName })
})

app.get('/home/painter', (req, res) => {
  res.render('painter', { userNameEJS: userName })
})

app.get('/home/:name', async (req, res) => {
  const plumber = await expertModel.findOne({ name: req.params.name })
  res.render('profile', {
    userNameEJS: userName,
    nameEJS: plumber.name,
    emailEJS: plumber.email,
    mobileEJS: plumber.mobileNo,
    pinEJS: plumber.pincode,
    availableEJS: plumber.availablity,
    professionEJS: plumber.profession,
    descriptionEJS: plumber.profileDescription,
    rateEJS: plumber.rate,
  })
})

app.get('/home/profile/logout', (req, res) => {
  res.render('expertInfo')
})

app.get('/editprofile', async(req, res) => {
  const newExpertData = await expertModel.findOne({name:expertName})
  console.log(expertName)
  res.render('editProfile', {
    userNameEJS: expertName,
    expertNameEJS: expertName,
    expertEmailEJS: newExpertData.email,
    expertMobileEJS: newExpertData.mobileNo,
  })
})

// Listening On Port 80
const serverLink = 'http://localhost/'
app.listen(80, (req, res) => {
  console.log(`Server started on ${serverLink}`)
})
