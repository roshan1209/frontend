import React, { Component, useEffect, useState } from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, TextField,TextareaAutosize ,Typography } from "@mui/material";
import "./Update.css"
import axios from 'axios';
import { useParams } from 'react-router-dom';


const UpdateForm = () =>{

  const {ID} = useParams()
  console.log(ID)


  const initialstate = {firstName:"",lastName:"",location:"",email:"",dob: new Date(),education:"",about:""}
  const [user,setUser] = useState(initialstate)

  const getFun = async() =>{
    const response = await axios.get("http://localhost:4500/list1page/"+ID)
    console.log(response.data.msg)
    const data = response.data.msg[0]
    console.log(data)
    setUser(data)
  }

  const updateFun =async(event) =>{
    event.preventDefault()
    console.log(user)
    const response = await axios.put("http://localhost:4500/updatedetails/"+ID,user);
    debugger
    console.log(response)
  }

  useEffect(()=>{
    getFun()
  },[])

  const handleChangeInput = (event) =>{
    const {name,value} = event.target;
    setUser({...user,[name]:value})
  }


  return(
    <div>
        <div>
          <Button href="/" className="arrowdiv"><ArrowBackIcon/></Button>
        </div>
        <div className="formdiv">
        <form onSubmit={updateFun}>
          <div className="namediv">
            <div className="eachfield">
              <Typography variant="h6">First Name &nbsp;&nbsp;:&nbsp;</Typography>
              <TextField value={user.firstName} name='firstName' onChange={handleChangeInput} className="textfieldcss" required />
            </div>
            <div className="eachfield last">
              <Typography variant="h6">Last Name :&nbsp;</Typography>
              <TextField value={user.lastName} name='lastName' onChange={handleChangeInput} className="textfieldcss" required/>
            </div>
          </div><br/><br/>
          <div>
            <div className="eachfield">
              <Typography variant="h6">Location &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</Typography>
              <TextField value={user.location} name='location' onChange={handleChangeInput} className="textfieldcss" type="text" required/>
            </div><br/><br/>
            <div className="eachfield">
              <Typography variant="h6">Email &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</Typography>
              <TextField value={user.email} name='email' onChange={handleChangeInput} className="textfieldcss" required/>
            </div><br/><br/>
            <div className="eachfield">
              <Typography variant="h6">DOB &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</Typography>
              <TextField type='date' value={user.dob} name='dob' onChange={handleChangeInput} className="textfieldcss" required/>
            </div><br/>
            <div className="eachfield">
              <Typography variant="h6">Education &nbsp;&nbsp;&nbsp;:&nbsp;</Typography>
              <TextField value={user.education} name='education' onChange={handleChangeInput} className="textfieldcss" required/>
            </div><br/><br/>
            <div className="texteareafield">
              <Typography variant="h6">About &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;</Typography>
              <TextareaAutosize value={user.about} name='about' onChange={handleChangeInput} cols={50} minRows={10} required>
              </TextareaAutosize>
            </div><br/><br/>
            </div>
            <Button type="submit" variant="text" className="button" >Submit</Button>
        </form>
        </div>
      </div>
    )
}


export default class Update extends Component {

  render() {
    return (
      <UpdateForm/>
    )
  }
}
