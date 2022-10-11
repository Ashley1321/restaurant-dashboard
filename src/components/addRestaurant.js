import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import pic from '../images/logo.png';
import { addDoc} from 'firebase/firestore';
import { db,storage } from '../config/firebase';
import {useHistory} from 'react-router-dom';
import { Link } from 'react-router-dom';
import {ref, uploadBytesResumable, getDownloadURL,storageRef} from 'firebase/storage'
import { collection, deleteDoc, doc, getDocs } from 'firebase/firestore';

//material ui

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import { makeStyles } from '@material-ui/core/styles';
import { async } from '@firebase/util';



const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      fontSize:50
    },
    navigation:{
        backgroundColor:'#2B2C34',
        alignItems:'center',
        color:'white'
    },
    aside:{
        backgroundColor:'white',
        alignItems:'center',
        color:"#2B2C34"
        
    },
    second:{
        flexGrow: 1,
        fontSize:30,
        marginTop:10,
        color:"#2B2C34"
    },
    logo:{
        width:200,
        height:200,
        marginTop:-120
    }
 
  }));

  
  const AddFood = () => {

    const [foodName,setFoodName] = useState('');
    const [price,setPrice] = useState('')
    const [quantity,setQuantity] = useState('')
    const [description,setDescription] = useState('')
    const [size,setSize] = useState('')
    const [category,setCategory] = useState('')
    const history = useHistory()
    const [menu,setMenu] = useState({})

    //push image to firebase

    const [myForm,setMyForm] = useState({
        image:'',
      })
      
    
      const handleImage =(e) => {
    
        setMyForm({...myForm, image:e.target.files[0]})
      }

    const addFood = () => {
         //data to push to firebase
         const storageRef = ref(storage,`/images/${Date.now()}${myForm.image.name}`);

         const uploadImage = uploadBytesResumable(storageRef,myForm.image);
         uploadImage.on(
           "state_changed",
           (snapshot) => {
             const progressPercent = Math.round(
               (snapshot.bytesTransferred/snapshot.totalBytes)* 100
             );
           },
           (err) => {
             console.log(err);
           },
           ()=>{
             setMyForm({
               image:'',
             });
             getDownloadURL(uploadImage.snapshot.ref).then((url)=> {
                console.log(url);
                const collectionRef = collection (db,"food Menu");
                const foodEntry = {
                    foodName:foodName,
                    price:price,
                    quantity:quantity,
                    description:description,
                    category:category,
                    size:size,
                    image: url
                    
                };
                
                addDoc(collectionRef,foodEntry).then(()=>{
                  alert("successfully added", {type:'successful'});
                }).catch((err)=> {
                  alert('Something went wrong', {type:"error"})
                })
              })
            }
          )     

    
    
    //push data to firestore
    addDoc(addMenuRef,menu).then(()=>{
        console.log("added to firebase")
        alert("Successfully Added")
        history.push("/Admin")
    }).catch((err)=>{
        console.log(err);
    })

    }

  

    const addMenuRef = collection(db,"food Menu")   
    const classes = useStyles(); 
    return(
        <div style={{width:'100%'}}>
            <div className={classes.root}>
                <AppBar position="static" style={{ height: 200, backgroundColor: '#E85800', width: '100%', justifyContent: "center" }}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Add Food 
                        </Typography>
                        
                    </Toolbar>
                </AppBar>
            </div>
            <div className={classes.navigation} style={{ width: "20%", height: "770px" }}>
           <Link to='/Admin' style={{textDecoration:'none',color:'white'}}><Button style={{marginTop:'50%'}} color="inherit">Food Manu</Button></Link><br></br><br></br>
            <Link to='/' style={{textDecoration:'none',color:'white'}}><Button color="inherit">Add Food</Button></Link><br></br><br></br>
            <Link to='/edit' style={{textDecoration:'none',color:'white'}}><Button color="inherit">Edit Menu</Button></Link><br></br><br></br>
            
            </div>
            <div className={classes.aside} style={{width:'80%',marginLeft:"20%",marginTop:'-600px',}}>
                <img src={pic} className={classes.logo}/>
                <Typography variant="h6" className={classes.second}>
                    Add Food To Manu
                </Typography>
            <TextField id="standard-basic" label="Food Name" onChange={(e)=> setFoodName(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white"}} /><br></br>
            <TextField id="standard-basic" label="Price" onChange={(e)=> setPrice(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white"}} /><br></br>
            <TextField id="standard-basic" label="Quantity" onChange={(e)=> setQuantity(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white"}}/><br></br>
            <TextField id="standard-basic" label="Description" onChange={(e)=> setDescription(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white"}}/><br></br>
            <TextField id="standard-basic" label="Category" onChange={(e)=> setCategory(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white"}}/><br></br>
            <TextField id="standard-basic" label="Size" onChange={(e)=> setSize(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white"}}/><br></br>
            <input type='file'accept='image' onChange={(e)=>{handleImage(e)}} style={{marginTop:'2%',alignItems:"end"}} /><br></br>
            <Button variant="contained" style={{backgroundColor:'#E85800', marginTop:'15px'}} onClick={(e)=>{addFood()}}> Add To Menu</Button>
            </div>
        </div>

  
    )
  }

  export default AddFood;