import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../config/firebase";
import '../components/inputs.css';
import pic from '../images/continental.png';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


function LogIn(){

    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')

    let history = useHistory();

    const Register = () => {
        signInWithEmailAndPassword (auth,email,password).then(()=>{
            history.push('/addRestaurant')
            alert('Successfully Logged In')
        }).catch((error)=>{
            console.log(error);
            alert('something went wrong');
        })
    }

    return(
        <div className="MainDiv">
            <div className="contentsCont">
                <h1 style={{color:"#95e349",marginTop:'15%'}}>Log In With Details Linked with Account</h1>
                <img src={pic} style={{width:400,height:400,borderRadius:'50%'}}/>
            </div>
            <div className="bigBox">
                <h1 style={{textAlign:'center',marginTop:"35%"}}> Log Into Your Account </h1>
                <TextField id="standard-basic" label="Enter Your Email" onChange={(e)=> setEmail(e.target.value)} style={{marginTop:"3%",width:'80%',color:"white"}} /><br></br>
                <TextField id="standard-basic" label="Enter Your Password" onChange={(e)=> setPassword(e.target.value)} style={{marginTop:"3%",width:'80%',color:"white"}} /><br></br>
                <Button variant="contained" style={{backgroundColor:'#95e349', marginTop:'10%',width:'80%'}} onClick={Register}>Log In</Button>
                <Link to='/signUp' style={{color:'black',textDecoration:'none',marginLeft:"60%"}}>Register Account</Link><br></br>
                <Link to='/resetPassword' style={{color:'black',textDecoration:'none',marginLeft:"60%"}}>Forgot Password</Link>
            </div>

        </div>
    )
}


export default LogIn;