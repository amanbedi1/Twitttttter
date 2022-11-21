import React,{useEffect, useState} from 'react'
import {Link,useHistory} from 'react-router-dom'
import { Card, Container, Row } from 'react-bootstrap'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {FormControl, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import EmailIcon from '@material-ui/icons/Email';

const SignUp  = ()=>{
    const history = useHistory()
    const [name,setName] = useState("")
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [image,setImage] = useState("")
    const [imgurl,setImgUrl] = useState(undefined)
    const [showPassword, togglePassword] = useState(false)

    useEffect(() => {
        if(imgurl) {
            uploadFields()
        }
    }, [imgurl])

    const uploadPic = () => {
        const data = new FormData()
        data.append("file", image)
        data.append("upload_preset", "social-connect")
        data.append("cloud_name", "omanshu840")
        fetch("https://api.cloudinary.com/v1_1/omanshu840/image/upload", {
            method: "post",
            body: data
        })
        .then(res => res.json())
        .then(data => {
            console.log(data.url)
            setImgUrl(data.url)
        })
        .catch(err => {
            console.log(err)
        })
    }

    const uploadFields = () => {
        fetch("/signup",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,
                password,
                email,
                pic: imgurl
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              alert(data.error)
           }
           else{
               alert("signed up successfully")
               history.push('/signin')
           }
        }).catch(err=>{
            console.log(err)
        })
    }

    const PostData = ()=>{

        if(image) {
            uploadPic()
        }
        else {
            uploadFields()
        }
        
        
    }

   return (
    <Container>            
        <Row className="justify-content-md-center">
            <div className="col-12 col-md-6 card-login">
                <Paper elevation={3} >
                    <Card className="text-center">
                        <Card.Header><h2>Sign Up</h2></Card.Header>
                        <Card.Body>

                            <FormControl fullWidth>
                                <InputLabel htmlFor="name-field">Name*</InputLabel>
                                <Input
                                    id="name-field"
                                    type='text'
                                    value={name}
                                    onChange={(e)=>setName(e.target.value)}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton>
                                            <AccountCircleIcon/>
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel htmlFor="email-field">Email*</InputLabel>
                                <Input
                                    id="email-field"
                                    type='email'
                                    value={email}
                                    onChange={(e)=>setEmail(e.target.value)}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton>
                                            <EmailIcon/>
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                            </FormControl>

                            <FormControl fullWidth>
                                <InputLabel htmlFor="standard-adornment-password">Password*</InputLabel>
                                <Input
                                    required
                                    id="standard-adornment-password"
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e)=>setPasword(e.target.value)}
                                    endAdornment={
                                    <InputAdornment position="end">
                                        <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={ () => togglePassword(!showPassword)}
                                        >
                                        {showPassword ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment>
                                    }
                                />
                            </FormControl>
                            <Link to="/signin">Already have an account? Sign In</Link>
                        </Card.Body>
                        <Card.Footer className="text-muted">
                            <Button 
                                size="large"
                                variant="contained" 
                                color="primary"
                                onClick={()=>PostData()}
                                endIcon={<InputIcon/>}
                            >
                                Sign Up
                            </Button>
                        </Card.Footer>
                    </Card>
                </Paper>
            </div>
        </Row>
    </Container>
      
   )
}


export default SignUp