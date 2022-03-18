const Students = require('../models/Students')
const Instructors = require('../models/Instructors')
const Admins = require('../models/Admins')

const {OAuth2Client} = require('google-auth-library')
const jwt = require('jsonwebtoken');
require('dotenv').config();


const client = new OAuth2Client("499316289094-jrcm8c2ugt7d7hobasv2sh2u63a7d1r1.apps.googleusercontent.com")

const googlelogin = (req,res) => {
  const {tokenId , type} = req.body
  client.verifyIdToken({idToken:tokenId,audience : "499316289094-jrcm8c2ugt7d7hobasv2sh2u63a7d1r1.apps.googleusercontent.com"}).then(response=>{
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
                    const token = jwt.sign({emailId:admin.adminEmail,type:'Admin'},process.env.JWT_KEY,{expiresIn:'7d'});
                    res.json({token,admin:{emailId : admin.adminEmail,type:'Admin'}})
                  }
                  else{
                    return res.status(400).json({error:"Something went wrong"})
                  }
                }
              })
        }
        if(type==='instructor')
        {
            if(email==='cse200001044@iiti.ac.in'){
                const token = jwt.sign({emailId:email,type:'Instructor'},process.env.JWT_KEY,{expiresIn:'7d'});
                res.json({token,instructor:{emailId : email,type:'Instructor'}})
            }   
            else{
                return res.status(400).json({error:"Something went wrong"})
            }
        }
        if(type==='student')
        {
            if(email==='mihirkkarandikar@gmail.com'){
                const token = jwt.sign({emailId:email,type:'Student'},process.env.JWT_KEY,{expiresIn:'7d'});
                res.json({token,student:{emailId : email,type:'Student'}})
            }   
            else{
                return res.status(400).json({error:"Something went wrong"})
            }
        }
    }
  })
}

module.exports = { googlelogin}
