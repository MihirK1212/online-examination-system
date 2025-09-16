const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken');
require('dotenv').config()

const DB_URI = process.env.MONGO_URI // eg:- mongodb://localhost/ONLINE-EXAMINATION-SYSTEM
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
    console.log("JWT Middleware",req.headers.authorization)
    const decoded = jwt.verify(req.headers.authorization, process.env.JWT_KEY)
    console.log("Decoded token ",decoded)

    const type = decoded.type
    const emailID = decoded.emailID

    req.emailID = emailID

    if(type==='Admin')
    {
      const user = await Admins.findOne({adminEmail:emailID})
      if(user)
      {
        return next()
      }
      else
      {
        return res.status(401).json({message:"JWT Auth Failed"})
      }
    }
    if(type==='Instructor')
    {
      const user = await Instructors.findOne({instructorEmail:emailID})
      if(user)
      {
        return next()
      }
      else
      {
        return res.status(401).json({message:"JWT Auth Failed"})
      }
    }
    if(type==='Student')
    {
      const user = await Students.findOne({studentEmail:emailID})
      if(user)
      {
        return next()
      }
      else
      {
        return res.status(401).json({message:"JWT Auth Failed"})
      }
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

const authRoute = require('./routes/auth');
const Instructors = require('./models/Instructors');
const Students = require('./models/Students');
app.use('/auth',authRoute)

app.post('/getParticipants',async(req,res)=>{
  try {
    const studentsList = req.body.studentsList
    const instructorsList = req.body.instructorsList

    const students = await Students.find({})
    const instructors = await Instructors.find({})

    console.log("Student list received ",studentsList)
    console.log("Instructor list received ",studentsList)

    let studentParticipants = []
    let instructorParticipants = []

    studentsList.map((studentEmail)=>{
      let ind = students.findIndex(student=>student.studentEmail===studentEmail)
      let student = students[ind]
      if(!student){return}
      studentParticipants = [...studentParticipants,{studentEmail:studentEmail,studentName:student.generalDetails.name}]
    })

    instructorsList.map((instructorEmail)=>{
      let ind = instructors.findIndex(instructor=>instructor.instructorEmail===instructorEmail)
      let instructor = instructors[ind]
      instructorParticipants = [...instructorParticipants,{instructorEmail:instructorEmail,instructorName:instructor.generalDetails.name}]
    })

    return res.status(201).json({"participants":{studentParticipants:studentParticipants,instructorParticipants:instructorParticipants}})

  } catch (error) {
    console.log(error)
    return res.status(404).json({"message":error})
  }
})

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
