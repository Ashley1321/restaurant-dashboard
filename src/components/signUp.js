import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import '../components/inputs.css';
import pic from '../images/continental.png';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


function SignUp(){

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [name,setName] = useState('')
    const [surname,setSurname] = useState('')
    const [id,setID] = useState('')

    let history = useHistory();

    const Register = () => {
        createUserWithEmailAndPassword(auth,email,password).then(()=>{
            history.push('/addRestaurant')
            alert('Successfully Signed up')
        }).catch((error)=>{
            console.log(error);
            alert('something went wrong');
        })
    }

    return(
        <div className="MainDiv">
            <div className="contentsCont">
                <h1 style={{color:"#95e349",marginTop:'15%'}}>Register Your Details</h1>
                <img src={pic} style={{width:400,height:400,borderRadius:'50%'}}/>
            </div>
            <div className="bigBox">
                <h1 style={{textAlign:'center',marginTop:"13%"}}> Set Up Your Account </h1>
                <TextField id="standard-basic" label="Enter Your Name" onChange={(e)=> setName(e.target.value)} style={{marginTop:"5%",width:'80%',color:"white"}} /><br></br>
                <TextField id="standard-basic" label="Enter Your Surname" onChange={(e)=> setSurname(e.target.value)} style={{marginTop:"3%",width:'80%',color:"white"}} /><br></br>
                <TextField id="standard-basic" label="Enter ID Number" onChange={(e)=> setID(e.target.value)} style={{marginTop:"3%",width:'80%',color:"white"}} /><br></br>
                <TextField id="standard-basic" label="Enter Your Email" onChange={(e)=> setEmail(e.target.value)} style={{marginTop:"3%",width:'80%',color:"white"}} /><br></br>
                <TextField id="standard-basic" label="Enter Your Password" onChange={(e)=> setPassword(e.target.value)} style={{marginTop:"3%",width:'80%',color:"white"}} /><br></br>
                <Button variant="contained" style={{backgroundColor:'#95e349', marginTop:'10%',width:'80%'}} onClick={Register}> Register</Button>
                <Link to='/' style={{color:'black',textDecoration:'none',marginLeft:"60%"}}>Log In</Link>
            </div>

        </div>
    )
}


export default SignUp