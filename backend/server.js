const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const DB_URI = process.env.MONGO_URI
const PORT = process.env.PORT || 5000;

const Admins = require('./models/Admins')


app.use(cors())
app.use(express.json({ limit: '50mb' }))

mongoose.connect(DB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(res => console.log('mongoDB connected...'))
  .catch(err => console.log(err))


app.get('/', (req, res) => {
  res.status(200).json({
    msg: "This is the examination system server"
  })
})

const jwtAuth = async (req,res,next)=>{
  try{
    // return next()
    console.log("JWT Middleware",req.headers.authorization)
    const decoded = jwt.verify(req.headers.authorization, process.env.JWT_KEY)
    console.log("Decoded token ",decoded)

    req.userName = decoded.name

    const userEmailId = decoded.email
    const user = await Admins.findOne({userEmailId:userEmailId})
    if(user)
    {
      return next()
    }
    else
    {
      return res.status(401).json({message:"JWT Auth Failed"})
    }
  }
  catch(error){
    console.log(error)
    return res.status(401).json({message:"JWT Auth Failed"})
  }
}

const adminsRoute = require('./routes/Admin')
app.use('/admin',jwtAuth,adminsRoute)

const instructorsRoute = require('./routes/Instructors')
app.use('/instructor',jwtAuth,instructorsRoute)

const studentsRoute = require('./routes/Students')
app.use('/student',jwtAuth,studentsRoute)

const authRoute = require('./routes/auth')
app.use('/auth',authRoute)

app.post('/addAdmin',async (req,res)=>{
  try {
    const admin = await Admins.create(req.body)
    return res.status(201).json({"newAdmin":admin})
  } catch (error) {
      return res.status(404).json({"message":error})
  }
})

app.listen(PORT, () => {
  console.log(`Listening on the port: ${PORT}`);
});
