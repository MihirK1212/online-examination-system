import React from 'react';
import { useState } from 'react';
import {useDispatch} from 'react-redux'
import * as XLSX from 'xlsx';

import "./style.css"

import { Button } from '@material-ui/core';
import Navbar from "../../../components/admin/General/Navbar/Navbar"

import { addStudents } from '../../../redux/actions/Admin';

function AddStudents() {

    const dispatch = useDispatch()

    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    console.log("Columns",columns)
    console.log("Data",data)

    const handleSubmit = ()=>{
      let students = []

      if(!(columns.length===4 && columns[0]['name']==='Email' && columns[0]['name']==='Name' 
                              && columns[0]['name']==='D_O_B' && columns[0]['name']==='Phone_Number'
                              && columns[0]['name']==='Degree' && columns[0]['name']==='Program_Name'
                              && columns[0]['name']==='Start_Date'))
      {
        alert('Invalid file uploaded for students list. Please follow the instructions')
        return
      }

      data.forEach(student=>{
        let studentData = {}
        studentData.studentEmail = student.Email
        studentData.generalDetails = {}
        studentData.generalDetails.name = student.Name
        studentData.generalDetails.dateOfBirth = student.D_O_B
        studentData.generalDetails.phoneNumber = student.Phone_Number
        studentData.generalDetails.degree = student.Degree
        studentData.generalDetails.programName = student.Program_Name
        studentData.generalDetails.startDateOfProgram = student.Start_Date
        studentData.registeredCourses = []
        students.push(studentData)
      })

      console.log("students ",students)
      dispatch(addStudents(students))
    }

    // process CSV data
    const processData = dataString => {
      const dataStringLines = dataString.split(/\r\n|\n/);
      const headers = dataStringLines[0].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
   
      const list = [];
      for (let i = 1; i < dataStringLines.length; i++) {
        const row = dataStringLines[i].split(/,(?![^"]*"(?:(?:[^"]*"){2})*[^"]*$)/);
        if (headers && row.length === headers.length) {
          const obj = {};
          for (let j = 0; j < headers.length; j++) {
            let d = row[j];
            if (d.length > 0) {
              if (d[0] === '"')
                d = d.substring(1, d.length - 1);
              if (d[d.length - 1] === '"')
                d = d.substring(d.length - 2, 1);
            }
            if (headers[j]) {
              obj[headers[j]] = d;
            }
          }
   
          // remove the blank rows
          if (Object.values(obj).filter(x => x).length > 0) {
            list.push(obj);
          }
        }
      }
   
      // prepare columns list from headers
      const columns = headers.map(c => ({
        name: c,
        selector: c,
      }));
   
      setData(list);
      setColumns(columns);
    }

    // handle file upload
    const handleFileUpload = e => {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (evt) => {
        /* Parse data */
        const bstr = evt.target.result;
        const wb = XLSX.read(bstr, { type: 'binary' });
        /* Get first worksheet */
        const wsname = wb.SheetNames[0];
        const ws = wb.Sheets[wsname];
        /* Convert array of arrays */
        const data = XLSX.utils.sheet_to_csv(ws, { header: 1 });
        processData(data);
      };
      reader.readAsBinaryString(file);
      
    }
    
    return (
        <>
          <Navbar/>
            <div className="studentsForm">
                <form action="/admin">
                    <br></br>
                    <h3 style={{ paddingTop:'10px' }}>Add Students</h3>
                    <br></br> <br></br> 

                    <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    />
                    <br></br> <br></br> 
                
                    <table class="table">
                    <thead>
                      <tr>
                        <th scope="col">Email</th>
                        <th scope="col">Name</th>
                        <th scope="col">D.O.B</th>
                        <th scope="col">Phone Number</th>
                        <th scope="col">Degree</th>
                        <th scope="col">Program Name</th>
                        <th scope="col">Start Date of Program</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        data.map((d)=>(
                          <tr key={d.Email}>
                            <td> {d.Email}        </td>
                            <td> {d.Name}         </td>
                            <td> {d.D_O_B}        </td>
                            <td> {d.Phone_Number} </td>
                            <td> {d.Degree}       </td>
                            <td> {d.Program_Name} </td>
                            <td> {d.Start_Date}   </td>
                            
                          </tr>
                        ))
                      }
                      
                    </tbody>
                  </table>
                </form> 
            </div>
            <br></br><br></br><br></br><br></br>
            <Button variant="contained" onClick={handleSubmit} style={{display:"block",marginLeft:"auto",marginRight:"auto",marginTop:20,marginBottom:20,maxWidth: '200px', maxHeight: '500px', minWidth: '200px', minHeight: '50px',backgroundColor: "#22a2ec",}}>Submit</Button>
        </>
    )
}

export default AddStudents;
