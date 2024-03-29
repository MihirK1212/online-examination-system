import React from 'react';
import { useState } from 'react';
import {useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom';

import * as XLSX from 'xlsx';

import { FormControl, InputLabel,Select,MenuItem , TextField , Card , Button} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@mui/icons-material/Close';

import Navbar from "../../../components/admin/General/Navbar/Navbar"

import { addCourseInstance } from '../../../redux/actions/Admin';

import "./style.css"


function AddCourseInstance({instructors}) {
  
  const dispatch = useDispatch()
  const navigate = useNavigate()

  instructors = instructors.map((instructor)=>{return instructor.instructorEmail})
  console.log(instructors)
  const [selectedInstructors,setSelectedInstructors] = useState([])


  const [formData,setFormData] = useState({"courseCode":"","year":2022,"semester":"spring"})

  const [filteredList,setFilteredList] = useState([])
  const [searchQuery,setSearchQuery] = useState("")

  const [columns, setColumns] = useState([]);
  const [data, setData] = useState([]);

  
  console.log("Columns",columns)
  console.log("Data",data)
  
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

  const selectInstructor = (id)=>{
      setSelectedInstructors([...selectedInstructors,id])
      setSearchQuery("")
      setFilteredList([])
  }

  const removeInstructor = (id)=>{
    setSelectedInstructors([...selectedInstructors.filter(x=>x!==id)])
  }

  const filterList = (query)=>{
      if(query===""){query=null;}
      let res = instructors.filter(id=>id.startsWith(query))
      res = res.filter(id=>!selectedInstructors.includes(id))
      setFilteredList(res)
  }

  const handleSubmit = ()=>{
    let postData = {}
    postData.courseCode = formData.courseCode
    postData.year = formData.year
    postData.semester = formData.semester
    postData.announcements = []

    if(columns.length===1 && columns[0]['name']==='Email')
    {
        let res = []
        data.forEach(student=>{
            res.push(student.Email)
        })
        postData.studentsList = res
    }
    else
    {
      alert('Invalid file uploaded for students list. Please follow the instructions')
      return
    }

    postData.instructorsList = selectedInstructors
    postData.Exams = []

    console.log("post data ",postData)
    alert("Course instance added")
    dispatch(addCourseInstance(postData))
    navigate('/admin')
  }

  return (
      <>
      <Navbar/>
          <div className="formContainer">
              <form>
                  <h3>General Course Details</h3>
                  
                  <TextField
                  variant={'standard'}
                  fullWidth
                  label={"Course Code"}
                  value={formData.courseCode}
                  onChange={e=>setFormData({...formData,courseCode:e.target.value})}
                  />
                  <br/><br/>
                  
                  <TextField
                  variant={'standard'}
                  fullWidth
                  label={"Year"}
                  type={"number"}
                  value={formData.year}
                  onChange={e=>setFormData({...formData,year:e.target.value})}
                  />
                  <br/><br/>
                  
                  <FormControl fullWidth>
                      <InputLabel variant={'standard'}>Semester</InputLabel>
                      <Select
                          value={formData.semester}
                          label="Semester"
                          onChange={e=>setFormData({...formData,semester:e.target.value})}
                          variant={'standard'}>
                          <MenuItem value={'spring'}>Spring</MenuItem>
                          <MenuItem value={'autumn'}>Autumn</MenuItem>
                      </Select>
                  </FormControl>
                  <br/><br/>

                  <h3>Add Instructors</h3>

                  <TextField
                  variant={'standard'}
                  fullWidth
                  label={"Search Email-ID"}
                  value={searchQuery}
                  onChange={(e)=>{console.log("Setting",e.target.value); setSearchQuery(e.target.value); filterList(e.target.value)}}
                  />
                  <br/><br/>

                  <ul>
                      {
                          selectedInstructors.map(id=><Card className="instructorCard"><span>{id}</span> <CloseIcon onClick={()=>{removeInstructor(id)}}/></Card>)
                      }
                  </ul>
                  {
                      filteredList.map(id=><Card className="instructorCard"><span>{id}</span> <AddIcon onClick={()=>{selectInstructor(id)}}/></Card>)
                  }

                  <br/><br/>

                  <h3>Add Students </h3>
                  <h5>(Upload one file with a column named 'Email' Format:.xlsx,.csv)</h5>
                  <br></br>
                  <input
                  type="file"
                  accept=".csv,.xlsx,.xls"
                  onChange={handleFileUpload}
                  />
                  <br></br>
                  <br></br>
                  <br></br>
              </form>

              <Button variant="contained" onClick={handleSubmit} style={{display:"block",marginLeft:"auto",marginRight:"auto",marginTop:20,marginBottom:20,maxWidth: '200px', maxHeight: '500px', minWidth: '200px', minHeight: '50px',backgroundColor: "#22a2ec",}}>Submit</Button>

              
          </div>
      </>
  )
}

export default AddCourseInstance;
