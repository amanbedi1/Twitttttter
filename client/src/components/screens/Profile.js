import { Card } from '@material-ui/core'
import React, {useEffect, useState, useContext} from 'react'
import {Container, Image, Row } from 'react-bootstrap'
import {UserContext} from '../../App'

const Profile  = ()=>{
    const [myposts, setMyPosts] = useState([])
    const {state, dispatch} = useContext(UserContext)
    const [image,setImage] = useState("")

    useEffect(() => {
        fetch('/myposts', {
            headers: {
               "Authorization" : "Bearer " + localStorage.getItem("jwt")
            }
         }).then(res => res.json())
         .then((result) => {
             console.log(result.myPost)
            setMyPosts(result.myPost)
         })
    }, [])

    useEffect(() => {
        if(image) {
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
                fetch('/updatepic',{
                    method:"put",
                    headers:{
                        "Content-Type":"application/json",
                        "Authorization":"Bearer "+localStorage.getItem("jwt")
                    },
                    body:JSON.stringify({
                        pic:data.url
                    })
                }).then(res=>res.json())
                .then(result=>{
                    console.log(result)
                    localStorage.setItem("user",JSON.stringify({...state,pic:result.pic}))
                    dispatch({type:"UPDATEPIC",payload:result.pic})
                    //window.location.reload()
                })
            })
            .catch(err => {
                console.log(err)
            })
        }
    }, [image])

    const updatePhoto = (file) => {
        setImage(file)
    }

    return(
        <>
            <Container>
                <Card elevation={3}>
                    <Row>
                        <div className="profile-img col-12 col-md-3">
                            <Image src={state? state.pic: "loading"} rounded />
                        </div>
                        <div className="profile-info col-12 col-md-9">
                            <div className="content pt-3">
                                <h3 className="pl-4">{state? state.name: "loading"}</h3>
                                <p className="text-muted pl-4">{state? state.email: "loading"}</p>
                                <p className="pl-4">
                                    <div>
                                        {state?state.followers.length:"0"} followers  
                                    </div>
                                    <div>
                                        {state?state.following.length:"0"} following
                                    </div>
                                    <div className="mt-3">
                                        <strong>Update pic</strong>
                                        <input
                                            className="px-3"
                                            type="file"
                                            placeholder="update pic"
                                            onChange={(e) => updatePhoto(e.target.files[0])}
                                        />
                                    </div>
                                </p>
                            </div>
                        </div>
                    </Row>
                </Card>
                <Card className="mt-4" elevation={3}>
                    <Row>
                        {myposts.map((item, index) => {
                            return (
                                <div key={index} className="col-12 col-md-3 profile-feed">
                                    <img src={item.photo} alt="..."/>
                                </div>
                            )
                        })}
                    </Row>
                </Card>
            </Container>
        </>
   )
}


export default Profile