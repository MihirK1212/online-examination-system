import React from 'react';
import { useState } from 'react';
import * as XLSX from 'xlsx';

import { FormControl, InputLabel,Select,MenuItem , TextField , Card} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import CloseIcon from '@mui/icons-material/Close';

import "./style.css"


function AddCourseInstance() {

    const instructors = ["asda123","xvkvx433","jsjd887","skdf9911","mihir123","mihi23","mk"];
    const [selectedInstructors,setSelectedInstructors] = useState([])


    const [formData,setFormData] = useState({"courseCode":"","year":2000,"semester":"spring"})

    const [filteredList,setFilteredList] = useState([])
    const [searchQuery,setSearchQuery] = useState(null)

    const [columns, setColumns] = useState([]);
    const [data, setData] = useState([]);

    
    console.log("Columns",columns)
    console.log("Data",data)
   
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

    const selectInstructor = (id)=>{
        setSelectedInstructors([...selectedInstructors,id])
    }

    const removeInstructor = (id)=>{
      setSelectedInstructors([...selectedInstructors.filter(x=>x!==id)])
    }

    const filterList = (query)=>{
        if(query===""){query=null;}
        const res = instructors.filter(id=>id.startsWith(query))
        setFilteredList(res)
    }

    return (
        <>
        <h1>This is the add course instance page</h1>
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

                    <h3>Add Students</h3>

                    <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    onChange={handleFileUpload}
                    />

                </form>
            </div>
        </>
    )
}

export default AddCourseInstance;
