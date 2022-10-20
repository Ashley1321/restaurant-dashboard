import React,{useState} from "react";
import { useHistory } from "react-router-dom";
import { Link } from "react-router-dom";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../config/firebase";
import '../components/inputs.css';
import pic from '../images/continental.png';
import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';


function ResetPass(){

    const [email,setEmail] = useState('')
   
    let history = useHistory();

    const resetPassword = () => {
        sendPasswordResetEmail (auth,email).then(()=>{
            history.push('/addRestaurant')
            alert('Check Your Emails')
        }).catch((error)=>{
            console.log(error);
            alert('something went wrong');
        })
    }

    return(
        <div className="MainDiv">
            <div className="contentsCont">
                <h1 style={{color:"#95e349",marginTop:'15%'}}>Reset Password With Email Linked with Account</h1>
                <img src={pic} style={{width:400,height:400,borderRadius:'50%'}}/>
            </div>
            <div className="bigBox">
                <h1 style={{textAlign:'center',marginTop:"35%"}}> Log Into Your Account </h1>
                <TextField id="standard-basic" label="Enter Your Email" onChange={(e)=> setEmail(e.target.value)} style={{marginTop:"3%",width:'80%',color:"white"}} /><br></br>
                <Button variant="contained" style={{backgroundColor:'#95e349', marginTop:'10%',width:'80%'}} onClick={resetPassword}>Reset</Button>
                <Link to='/' style={{color:'black',textDecoration:'none',marginLeft:"60%"}}>Log In</Link><br></br>
            </div>

        </div>
    )
}


export default ResetPass;