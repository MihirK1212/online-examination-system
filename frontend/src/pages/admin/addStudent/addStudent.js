import React from 'react';
import { FormControl, InputLabel,Select,MenuItem , TextField , Card} from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';
import "./styles.css"
import { useState } from 'react';
import {Button} from "@mui/material"
import * as XLSX from 'xlsx';

function AddStudent() {

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

    const filterList = (query)=>{
        if(query===""){query=null;}
        const res = instructors.filter(id=>id.startsWith(query))
        setFilteredList(res)
    }



    

    const [items, setItems] = useState([])

    const readExcel = (file) => {
      const promise = new Promise((resolve,reject)=>{

        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file)

        fileReader.onload=(e)=>{
          const bufferArray=e.target.result;

          const wb=XLSX.read(bufferArray,{type:"buffer"});

          const wsname=wb.SheetNames[0];

          const ws=wb.Sheets[wsname];

          const data=XLSX.utils.sheet_to_json(ws)

          resolve(data);
        };

        FileReader.onerror=((error)=>{
          reject(error);
        });
      });

      promise.then((d)=>{
        console.log(d);
        setItems(d)
      });
    };

    // const submitCategory = (e) => {
    //   e.persist();

    //   const data = {
    //     slug:categoryInput.slug,
    //   }
    // }

    return (
        <>
        <h1>This is the add student page</h1>
            <div className="formContainer">
                <form action="/admin">
                     <h3 style={{ paddingTop:'20px', fontSize:'30px' }}>General Student Details</h3>
                    
                    <h3 style={{ paddingTop:'10px' }}>Add Students</h3>

                    <input
                    type="file"
                    accept=".csv,.xlsx,.xls"
                    // onChange={handleFileUpload}
                    onChange={(e) => {
                      const file = e.target.files[0];
                      readExcel(file);
                    }}
                    />


                    <table class="table">
                    <thead>
                      <tr>
                        {/* <th scope="col">S No.</th> */}
                        <th scope="col">Sno</th>
                        <th scope="col">Name</th>
                        <th scope="col">Roll</th>
                      </tr>
                    </thead>
                    <tbody>
                      {
                        items.map((d)=>(
                      <tr key={d.Sno}>
                        <th>{d.Sno}</th>
                        <td>{d.Name}</td>
                        <td>{d.Roll}</td>
                        {/* <td>@twitter</td> */}
                      </tr>
                        ))
                      }
                      
                    </tbody>
                  </table>


                  {/* <Button className="btn btn-primary btn-block">Add Product</Button> */}
                    <Button type="submit" variant="contained" style={{ textalign:'centre', marginTop: '10rem' }}>Add Students</Button>
                     {/* <Button type="submit" style={{ paddingTop: '10px' }}>Add Students</Button> */}
                </form> 
            </div>
        </>
    )
}

export default AddStudent;
