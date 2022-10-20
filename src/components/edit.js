import React, { useEffect, useState } from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import TextField from '@material-ui/core/TextField';
import {db} from '../config/firebase';
import { Link } from 'react-router-dom';
import pic from '../images/continental.png';


import { makeStyles } from '@material-ui/core/styles';


import { addDoc, collection, doc, getDoc, updateDoc } from 'firebase/firestore';
import { useParams } from 'react-router-dom';
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
        backgroundColor:'#95e349',
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

const Editpage = () => {

    const {id} = useParams()
    console.log(id)

    //fuction to get single doc
    const getDocDetails = async(id)=>{
        const docref = doc(db,'food Menu',id)
        try{
            const docSnap = await getDoc(docref);
             if(docSnap.exists()){
                console.log('available')
                setDetails(docSnap.data())
             }else{
                console.log('not available')
             }

        }catch(err){
            console.log(err)
        }
    }

    //updateButton
    const update = async(id,foodName)=>{
        const menuDoc = doc(db,'food Menu',id)

        const foodEntry = {
            foodName:foodName,
            price:price,
            quantity:quantity,
            description:description,
            category:category,
            size:size,
    
        };

        await updateDoc(menuDoc,foodEntry).then(()=>{
            alert('updated successfully')
        }).catch(err=>{
            console.log(err)
        })
         
    }

    useEffect(()=>{
        getDocDetails(id)

    },[])

    const [foodName, setFoodName] = useState("")
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("")
    const [size, setSize] = useState("")

    const classes = useStyles();
    const [details, setDetails] = useState([])
    return (
        <div style={{width:'100%'}}>
            <div className={classes.root}>
            <AppBar position="static" style={{ height: 200, backgroundColor: 'black', width: '100%', justifyContent: "center" }}>
                    <Toolbar>
                        <Typography variant="h6" className={classes.title}>
                            Edit Food Menu 
                        </Typography>
                        
                    </Toolbar>
                </AppBar>
            </div>
            <div className={classes.navigation} style={{ width: "20%", height: "770px" }}>
           <Link to='/Admin' style={{textDecoration:'none',color:'white'}}><Button style={{marginTop:'50%'}} color="inherit">Food Menu</Button></Link><br></br><br></br>
            <Link to='addRestaurant/' style={{textDecoration:'none',color:'white'}}><Button color="inherit">Add Menu</Button></Link><br></br><br></br>
            <Link to='/edit' style={{textDecoration:'none',color:'white'}}><Button color="inherit">Edit Menu</Button></Link><br></br><br></br>
            
            </div>
            <div className={classes.aside} style={{width:'80%',marginLeft:"20%",marginTop:'-600px',}}>
                <img src={pic} className={classes.logo}/>
                <Typography variant="h6" className={classes.second}>
                    Edit Food Menu
                </Typography>
            <TextField id="standard-basic" label="Food Name" onChange={(e)=> setFoodName(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white"}} /><br></br>
            <TextField id="standard-basic" label="Price" onChange={(e)=> setPrice(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white"}} /><br></br>
            <TextField id="standard-basic" label="Quantity" onChange={(e)=> setQuantity(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white"}}/><br></br>
            <TextField id="standard-basic" label="Description" onChange={(e)=> setDescription(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white"}}/><br></br>
            <TextField id="standard-basic" label="Category" onChange={(e)=> setCategory(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white"}}/><br></br>
            <TextField id="standard-basic" label="Size" onChange={(e)=> setSize(e.target.value)} style={{marginTop:"1%",width:'40%',color:"white"}}/><br></br>
            <Button style={{backgroundColor:'#95e349', marginTop:'15px'}} onClick={(e)=>{update(id,foodName)}}  className={classes.but}  variant="contained" color="primary" id='myMainButton'>
                UPDATE
            </Button>
</div>
        </div>
       
    );
}

export default Editpage;
