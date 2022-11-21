import React,{useState, useContext} from 'react'
import {Link,useHistory} from 'react-router-dom'
import {UserContext} from '../../App'
import { Card, Container, Row } from 'react-bootstrap'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import EmailIcon from '@material-ui/icons/Email';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import {FormControl, IconButton, Input, InputAdornment, InputLabel } from '@material-ui/core';
import InputIcon from '@material-ui/icons/Input';

const SignIn = ()=>{
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    const [password,setPasword] = useState("")
    const [email,setEmail] = useState("")
    const [showPassword, togglePassword] = useState(false)

    
    const PostData = ()=>{
        
        fetch("/signin",{
            method:"post",
            headers:{
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                password,
                email,
            })
        }).then(res=>res.json())
        .then(data=>{
           if(data.error){
              alert(data.error)
           }
           else{
               localStorage.setItem("jwt", data.token)
               localStorage.setItem("user", JSON.stringify(data.user))
               dispatch({type:"USER", payload:data.user})
               history.push('/')
           }
        }).catch(err=>{
            console.log(err)
        })
    }

   return (
        <Container>            
            <Row className="justify-content-md-center">
                <div className="col-12 col-md-6 card-login">
                    <Paper elevation={3} >
                        <Card className="text-center">
                            <Card.Header><h2>Sign In</h2></Card.Header>
                            <Card.Body>

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
                                <Link to="/signup">Don't have an account? Sign Up</Link>
                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <Button 
                                    size="large"
                                    variant="contained" 
                                    color="primary"
                                    onClick={()=>PostData()}
                                    endIcon={<InputIcon/>}
                                >
                                    Sign In
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Paper>
                </div>
            </Row>
        </Container>
   )
}


export default SignIn