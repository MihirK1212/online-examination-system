const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
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

const adminsRoute = require('./routes/Admin')
app.use('/admin',adminsRoute)

const instructorsRoute = require('./routes/Instructors')
app.use('/instructor',instructorsRoute)

const studentsRoute = require('./routes/Students')
app.use('/student',studentsRoute)

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
