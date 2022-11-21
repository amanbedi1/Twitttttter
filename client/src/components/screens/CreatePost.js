import React, {useState, useEffect} from 'react'
import {useHistory} from 'react-router-dom'
import { Card, Container, Row } from 'react-bootstrap'
import Paper from '@material-ui/core/Paper';
import Button from '@material-ui/core/Button';
import {FormControl, Input, InputLabel } from '@material-ui/core';

const CreatePost = () => {

    const history = useHistory()

    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const [image, setImage] = useState("")
    const [imgUrl, setImgUrl] = useState("")

    useEffect(() => {
        if(imgUrl) {
            fetch("/createpost", {
                method: "post",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": "Bearer "+localStorage.getItem('jwt')
                },
                body: JSON.stringify({
                    title,
                    body,
                    imgUrl,
                })
            }).then(res => res.json())
            .then(data => {
    
                if(data.error) {
                    alert(data.error)
                }
                else {
                    alert("created post successfully")
                    history.push('/')
                }
            })
        }
    }, [imgUrl])

    
    const postDetails = () => {
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

    return (
        <>
        <Container>            
            <Row className="justify-content-md-center">
                <div className="col-12 col-md-6 card-login">
                    <Paper elevation={3} >
                        <Card className="text-center">
                            <Card.Header><h2>Create New Post</h2></Card.Header>
                            <Card.Body>

                                <FormControl fullWidth>
                                    <InputLabel htmlFor="name-field">Title*</InputLabel>
                                    <Input
                                        id="name-field"
                                        type='text'
                                        value={title}
                                        onChange={(e)=>setTitle(e.target.value)}
                                    />
                                </FormControl>

                                <FormControl fullWidth>
                                    <InputLabel htmlFor="email-field">Content*</InputLabel>
                                    <Input
                                        id="email-field"
                                        type='text'
                                        value={body}
                                        onChange={(e)=>setBody(e.target.value)}
                                    />
                                </FormControl>

                                <input
                                    type="file"
                                    placeholder="upload image"
                                    onChange={(e) => setImage(e.target.files[0])}
                                />

                            </Card.Body>
                            <Card.Footer className="text-muted">
                                <Button 
                                    size="large"
                                    variant="contained" 
                                    color="primary"
                                    onClick={()=>postDetails()}
                                >
                                    Post
                                </Button>
                            </Card.Footer>
                        </Card>
                    </Paper>
                </div>
            </Row>
        </Container>
        
        {/* <div>
          <div className="card auth-card input-field">
            <h2>Create Post</h2>
            
            <input
                type="text"
                placeholder="title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
            />

            <input
                type="text"
                placeholder="body"
                value={body}
                onChange={(e)=>setBody(e.target.value)}
            />

            <input
                type="file"
                placeholder="upload image"
                onChange={(e) => setImage(e.target.files[0])}
            />

            <button className="btn waves-effect waves-light #64b5f6 blue darken-1"
            onClick={()=>postDetails()}
            >
                SignIn
            </button>
            <h5>
                <Link to="/signup">Don't have an account ?</Link>
            </h5>
    
        </div>
      </div> */}
      </>
    )
}

export default CreatePost;