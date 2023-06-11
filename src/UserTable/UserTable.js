import React, { Component } from "react";
import "./Usertable.css";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { Button, TextField, Typography } from "@mui/material";
import Axios from "axios";
import Popup from 'reactjs-popup'


const TableBodyFunction = (props) =>{
  var date = new Date()
  const details = props.details;

  const deleteUser = async(user) =>{
    const response = await Axios.delete("http://localhost:4500/delete/"+user)
    console.log(response)
    window.location.href="/"
  }
  return(
    <TableBody>
                {details.map((row,index) => (
                  <TableRow
                    key={row.ID}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row" align="center">{index+1}</TableCell>
                    <TableCell align="center">{row.firstName}</TableCell>
                    <TableCell align="center">{row.lastName}</TableCell>
                    <TableCell align="center">{row.location}</TableCell>
                    <TableCell align="center">{row.email}</TableCell>
                    <TableCell align="center">{date.getDate(row.dob)}/{date.getMonth(row.dob)}/{date.getFullYear(row.dob)}</TableCell>
                    <TableCell align="center">{row.education}</TableCell>
                    <TableCell align="center"><Button variant="text" href={`/updatepage/${row.ID}`} className="actionbutton" startIcon={<EditIcon/>}>Edit</Button></TableCell>
                    <TableCell align="center"><Popup  trigger={<Button variant="text" className="actionbutton" startIcon={<DeleteIcon/>}>Delete</Button>} position={"left center"} >
                      {close=>(
                        <div className="popupdiv"><DeleteIcon/><Typography>Are you sure you want to Delete</Typography>
                        <Button type="cancel" onClick={()=>close()} className="popbutton">Cancel</Button><Button className="popbutton" onClick={()=>deleteUser(row.ID)}>Delete</Button></div>
                      )}
                      </Popup></TableCell>
                  </TableRow>
                ))}
              </TableBody>
  )
} 

export default class UserTable extends Component {
  state = {
    details: [],
    searchInput : "",
    filteredData:[],
  }

  componentDidMount() {
    this.getDetails()
    
  }

 

  getDetails = async () => {
    const option = {method:"GET"}
    const response = await fetch('http://localhost:4500/listpage',option)
    if(response.ok === true){
      const data = await response.json()
      this.setState({details:data.msg,filteredData:data.msg})
    }
  }

  search = () =>{
    const {searchInput,details} = this.state
    const filteredArray = details.filter((item)=> item.firstName.toLowerCase().includes(searchInput.toLowerCase()));
    this.setState({filteredData:filteredArray})
  }

  updatesearch = (event) =>{
    this.setState({searchInput:event.target.value},this.search)
    
  }

  render() {
    const {searchInput,filteredData} = this.state
  
    return (
      <div>
        <div>
          <Typography variant="h6">Student management system</Typography>
        </div>
        <div className="navoption">
          <TextField variant="outlined" size="10" value={searchInput} placeholder="search" onChange={this.updatesearch} ></TextField>
          <Button className="button" href="/insertpage" ml={5} variant="contained">
            Add
          </Button>
        </div>
        <div>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell align="center">ID</TableCell>
                  <TableCell align="center">First Name</TableCell>
                  <TableCell align="center">Last Name</TableCell>
                  <TableCell align="center">Location</TableCell>
                  <TableCell align="center">Email</TableCell>
                  <TableCell align="center">DOB</TableCell>
                  <TableCell align="center">Education</TableCell>
                  <TableCell align="center">Action</TableCell>
                  <TableCell align="center">Delete</TableCell>
                </TableRow>
              </TableHead>
              <TableBodyFunction  details={filteredData}/>
            </Table>
          </TableContainer>
        </div>
      </div>
    );
  }
}
