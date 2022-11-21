import { Card } from '@material-ui/core'
import React, {useEffect, useState, useContext} from 'react'
import { Button, Container, Image, Row } from 'react-bootstrap'
import { useParams } from 'react-router-dom'
import {UserContext} from '../../App'

const UserProfile  = ()=>{
    const [userProfile,setProfile] = useState(null)
    const {state,dispatch} = useContext(UserContext)
    const {userid} = useParams()
    const [showfollow,setShowFollow] = useState(state?!state.following.includes(userid):true)

    useEffect(()=>{
        fetch(`/user/${userid}`,{
            headers:{
                "Authorization":"Bearer "+localStorage.getItem("jwt")
            }
        }).then(res=>res.json())
        .then(result=>{
            console.log(result)
            setProfile(result)
        })
    },[])

    const followUser = ()=>{
        fetch('/follow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                followId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
        
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
            setProfile((prevState)=>{
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:[...prevState.user.followers,data._id]
                    }
                }
            })
            setShowFollow(false)
        })
    }

    const unfollowUser = ()=>{
        fetch('/unfollow',{
            method:"put",
            headers:{
                "Content-Type":"application/json",
                "Authorization":"Bearer "+localStorage.getItem('jwt')
            },
            body:JSON.stringify({
                unfollowId:userid
            })
        }).then(res=>res.json())
        .then(data=>{
            
            dispatch({type:"UPDATE",payload:{following:data.following,followers:data.followers}})
            localStorage.setItem("user",JSON.stringify(data))
        
            setProfile((prevState)=>{
                const newFollower = prevState.user.followers.filter(item=>item !== data._id )
                return {
                    ...prevState,
                    user:{
                        ...prevState.user,
                        followers:newFollower
                    }
                }
            })
            setShowFollow(true)
        })
    }

    return(
        <>
        {
            userProfile 
            ?
            <Container>
                <Card elevation={3} className="p-2">
                    <Row>
                        <div className="profile-img col-12 col-md-3">
                            <Image src={userProfile.user.pic} rounded />
                        </div>
                        <div className="profile-info col-12 col-md-9">
                            <div className="content pt-3">
                                <h3 className="pl-4">{userProfile.user.name}</h3>
                                <p className="text-muted pl-4">{userProfile.user.email}</p>
                                <p className="pl-4">
                                    <div>
                                        {userProfile.user.followers.length} followers  
                                    </div>
                                    <div>
                                        {userProfile.user.following.length} following
                                    </div>
                                </p>
                                <div className="pl-4">
                                    {
                                        showfollow
                                        ?
                                        <Button
                                        variant="primary"
                                        onClick={()=>followUser()}
                                        >
                                            follow
                                        </Button>
                                        :
                                        <Button
                                        variant="primary"
                                        onClick={()=>unfollowUser()}
                                        >
                                            Unfollow
                                        </Button>
                                    }
                                </div>
                            </div>
                        </div>
                    </Row>
                </Card>
            </Container>
            :
            <h2>Loading .. </h2>
        }
        </>
   )
}


export default UserProfile;