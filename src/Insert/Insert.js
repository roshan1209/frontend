import React, { Component,} from "react";
import "./Insert.css";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, TextField,TextareaAutosize ,Typography } from "@mui/material";
import axios from "axios";


export default class Insert extends Component {
  state = {
    firstName : "",
    lastName : "",
    location : "",
    email : "",
    dob : new Date(),
    education : "",
    about : ""
  }

  updatedFirstName = (event) =>{
    this.setState({firstName : event.target.value})
  }

  updatedLastName = (event) =>{
    this.setState({lastName : event.target.value})
  }

  updatedLocation = (event) =>{
    this.setState({location : event.target.value})
  }

  updatedEmail = (event) =>{
    this.setState({email : event.target.value})
  }

  updatedDob = (event) =>{
    this.setState({dob : event.target.value})
  }

  updatedEducation = (event) =>{
    this.setState({education : event.target.value})
  }

  updatedAbout = (event) =>{
    this.setState({about : event.target.value})
  }

  addDetailForm = async(event) => {
        event.preventDefault()
        const addUrl = "http://localhost:4500/adddetails"
        const response = await axios.post(addUrl,this.state)
        // const data = await response.json()
        
        
      }

  render() {
    const {firstName , lastName , location, email ,dob , education , about} = this.state
    return (
      <div>
        <div>
          <Button href="/" className="arrowdiv"><ArrowBackIcon/></Button>
        </div>
        <div className="formdiv">
        <form onSubmit={this.addDetailForm}>
          <div className="namediv">
            <div className="eachfield">
              <Typography variant="h6">First Name &nbsp;&nbsp;:&nbsp;</Typography>
              <TextField value={firstName} onChange={this.updatedFirstName} className="textfieldcss" required />
            </div>
            <div className="eachfield last">
              <Typography variant="h6">Last Name :&nbsp;</Typography>
              <TextField value={lastName} onChange={this.updatedLastName} className="textfieldcss" required/>
            </div>
          </div><br/><br/>
          <div>
            <div className="eachfield">
              <Typography variant="h6">Location &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</Typography>
              <TextField value={location} onChange={this.updatedLocation} className="textfieldcss" type="text" required/>
            </div><br/><br/>
            <div className="eachfield">
              <Typography variant="h6">Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</Typography>
              <TextField value={email} onChange={this.updatedEmail} className="textfieldcss" required/>
            </div><br/><br/>
            <div className="eachfield">
              <Typography variant="h6">DOB &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</Typography>
              <TextField type="date" value={dob} onChange={this.updatedDob} className="textfieldcss" required/>
            </div><br/>
            <div className="eachfield">
              <Typography variant="h6">Education &nbsp;&nbsp;&nbsp;:&nbsp;</Typography>
              <TextField value={education} onChange={this.updatedEducation} className="textfieldcss" required/>
            </div><br/><br/>
            <div className="texteareafield">
              <Typography variant="h6">About &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</Typography>
              <TextareaAutosize value={about} onChange={this.updatedAbout} cols={50} minRows={10} required>
              </TextareaAutosize>
            </div><br/><br/>
            </div>
            <Button type="submit" variant="text" href="/" className="button" >Submit</Button>
        </form>
        </div>
      </div>
    );
  }
}
