const Students = require('../models/Students')
const Instructors = require('../models/Instructors')
const Admins = require('../models/Admins')

const {OAuth2Client} = require('google-auth-library')
const jwt = require('jsonwebtoken');
require('dotenv').config();


const client = new OAuth2Client("630790416751-g3tk05k5j2kmgtqkl151o7rch4ol441r.apps.googleusercontent.com")

const googlelogin = (req,res) => {
  const {tokenId , type} = req.body
  client.verifyIdToken({idToken:tokenId,audience : "630790416751-g3tk05k5j2kmgtqkl151o7rch4ol441r.apps.googleusercontent.com"}).then(response=>{
    const {email_verified,name,email} = response.payload;
    if(email_verified)
    {
        if(type==='admin')
        {
            Admins.findOne({adminEmail:email}).exec((err,admin)=>{
                if(err){
                  return res.status(400).json({error:"Something went wrong"})
                }
                else{
                  if(admin){
                    const token = jwt.sign({emailID:admin.adminEmail,type:'Admin'},process.env.JWT_KEY,{expiresIn:'7d'});
                    res.json({token,admin:{emailID : admin.adminEmail,type:'Admin'}})
                  }
                  else{
                    return res.status(400).json({error:"Something went wrong"})
                  }
                }
              })
        }
        if(type==='instructor')
        {
            Instructors.findOne({instructorEmail:email}).exec((err,instructor)=>{
              if(err){
                return res.status(400).json({error:"Something went wrong"})
              }
              else{
                if(instructor){
                  const token = jwt.sign({emailID:instructor.instructorEmail,type:'Instructor'},process.env.JWT_KEY,{expiresIn:'7d'});
                  res.json({token,instructor:{emailID : instructor.instructorEmail,type:'Instructor'}})
                }
                else{
                  return res.status(400).json({error:"Something went wrong"})
                }
              }
            })
        }
        if(type==='student')
        {
            Students.findOne({studentEmail:email}).exec((err,student)=>{
              if(err){
                return res.status(400).json({error:"Something went wrong"})
              }
              else{
                if(student){
                  const token = jwt.sign({emailID:student.studentEmail,type:'Student'},process.env.JWT_KEY,{expiresIn:'7d'});
                  res.json({token,student:{emailID : student.studentEmail,type:'Student'}})
                }
                else{
                  return res.status(400).json({error:"Something went wrong"})
                }
              }
            })
        }
    }
  })
}

module.exports = { googlelogin}
