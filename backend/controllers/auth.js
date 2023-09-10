const Students = require("../models/Students");
const Instructors = require("../models/Instructors");
const Admins = require("../models/Admins");

const jwt = require("jsonwebtoken");
require("dotenv").config();

const googlelogin = (req, res) => {
  const { emailID, type } = req.body;

  if (type === "admin") {
    Admins.findOne({ adminEmail: emailID }).exec((err, admin) => {
      if (err) {
        return res.status(400).json({ error: "Something went wrong" });
      } else {
        if (admin) {
          const token = jwt.sign(
            { emailID: admin.adminEmail, type: "Admin" },
            process.env.JWT_KEY,
            { expiresIn: "7d" }
          );
          res.json({
            token,
            admin: { emailID: admin.adminEmail, type: "Admin" },
          });
        } else {
          return res.status(400).json({ error: "Something went wrong" });
        }
      }
    });
  }
  if (type === "instructor") {
    Instructors.findOne({ instructorEmail: emailID }).exec((err, instructor) => {
      if (err) {
        return res.status(400).json({ error: "Something went wrong" });
      } else {
        if (instructor) {
          const token = jwt.sign(
            { emailID: instructor.instructorEmail, type: "Instructor" },
            process.env.JWT_KEY,
            { expiresIn: "7d" }
          );
          res.json({
            token,
            instructor: {
              emailID: instructor.instructorEmail,
              type: "Instructor",
            },
          });
        } else {
          return res.status(400).json({ error: "Something went wrong" });
        }
      }
    });
  }
  if (type === "student") {
    Students.findOne({ studentEmail: emailID }).exec((err, student) => {
      if (err) {
        return res.status(400).json({ error: "Something went wrong" });
      } else {
        if (student) {
          const token = jwt.sign(
            { emailID: student.studentEmail, type: "Student" },
            process.env.JWT_KEY,
            { expiresIn: "7d" }
          );
          res.json({
            token,
            student: { emailID: student.studentEmail, type: "Student" },
          });
        } else {
          return res.status(400).json({ error: "Something went wrong" });
        }
      }
    });
  }
};

module.exports = { googlelogin };
