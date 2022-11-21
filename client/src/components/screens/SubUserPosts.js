import { Accordion, AccordionDetails, AccordionSummary, Avatar, CardHeader, Divider, IconButton, List, ListItem, ListItemText, Paper, TextField } from '@material-ui/core'
import React, {useState, useEffect, useContext} from 'react'
import { Card, Container, Row } from 'react-bootstrap'
import { Link } from 'react-router-dom'
import {UserContext} from '../../App'
import DeleteIcon from '@material-ui/icons/Delete';
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const SubUserPosts  = ()=>{

   const [data, setData] = useState([])
   const {state, dispatch} = useContext(UserContext)
   
   useEffect(() => {
      fetch('/getsubpost', {
         headers: {
            "Authorization" : "Bearer " + localStorage.getItem("jwt")
         }
      }).then(res => res.json())
      .then((result) => {
         setData(result.posts)
      })
   }, [])

   const likePost = (id) => {
      fetch('/like', {
         method: "put",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
         },
         body: JSON.stringify({
            postId: id
         })
      }).then(res => res.json())
      .then(result => {
         const newData = data.map(item => {
            if(item._id === result._id) {
               return result
            }
            else {
               return item
            }
         })

         setData(newData)
      })
   }

   const unlikePost = (id) => {
      fetch('/unlike', {
         method: "put",
         headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + localStorage.getItem("jwt")
         },
         body: JSON.stringify({
            postId: id
         })
      }).then(res => res.json())
      .then(result => {
         const newData = data.map(item => {
            if(item._id === result._id) {
               return result
            }
            else {
               return item
            }
         })

         setData(newData)
      })
   }

   const makeComment = (text,postId)=>{
      fetch('/comment',{
          method:"put",
          headers:{
              "Content-Type":"application/json",
              "Authorization":"Bearer "+localStorage.getItem("jwt")
          },
          body:JSON.stringify({
              postId,
              text
          })
      }).then(res=>res.json())
      .then(result=>{
          const newData = data.map(item=>{
            if(item._id===result._id){
                return result
            }else{
                return item
            }
         })
        setData(newData)
      }).catch(err=>{
          console.log(err)
      })
   }

   const deletePost = (postid)=>{
      fetch(`/deletepost/${postid}`,{
          method:"delete",
          headers:{
              Authorization:"Bearer "+localStorage.getItem("jwt")
          }
      }).then(res=>res.json())
      .then(result=>{
          console.log(result)
          const newData = data.filter(item=>{
              return item._id !== result._id
          })
          setData(newData)
      })
   }

   return(
        <Container>
           {data.map((item, index) => {
              return (
               <Row className="justify-content-md-center" key={index}>
                  <div className="col-12 col-md-8 card-post">
                     <Paper elevation={3} >
                        <Card>
                           <CardHeader
                              avatar={
                                 <Avatar>
                                    <img src="https://res.cloudinary.com/omanshu840/image/upload/v1608609510/sample.jpg" alt="..." />
                                 </Avatar>
                              }
                              action={
                                 item.postedBy._id === state._id 
                                 &&
                                 <IconButton 
                                    variant="primary"
                                    onClick={() => {deletePost(item._id)}}
                                 >
                                    <DeleteIcon/>
                                 </IconButton>
                              }
                              title={
                                 <Link to={item.postedBy._id !== state._id?"/profile/"+item.postedBy._id :"/profile"  }>
                                    {item.postedBy.name}
                                 </Link>
                              }
                              subheader={item.postedBy.email}
                           />
                           <Card.Body>
                              <img src={item.photo} alt="..." />
                           </Card.Body>
                           <Card.Footer className="text-muted">
                              <div>
                                 {
                                    item.likes.includes(state._id)
                                    ? 
                                    <IconButton onClick={() => {unlikePost(item._id)}}>
                                       <FavoriteIcon/>
                                    </IconButton>
                                    :
                                    <IconButton onClick={() => {likePost(item._id)}}>
                                       <FavoriteBorderIcon/>
                                    </IconButton>
                                 }
                              </div>
                              <div>
                                 {item.likes.length} Likes
                              </div>
                              <div className="mt-3">
                                 <h4>{item.title}</h4>
                              </div>
                              <div>
                                 <p>{item.body}</p>
                              </div>
                              <Accordion>
                                 <AccordionSummary
                                    expandIcon={<ExpandMoreIcon />}
                                    aria-controls="panel1a-content"
                                    id="panel1a-header"
                                 >
                                    Comments
                                 </AccordionSummary>
                                 <AccordionDetails>
                                       <List>
                                          {
                                             item.comments.map(record => {
                                                return (
                                                   <>
                                                      <Divider variant="inset" component="li" />
                                                      <ListItem>
                                                         <ListItemText 
                                                            primary={record.postedBy.name}
                                                            secondary={record.text}
                                                         />
                                                      </ListItem>
                                                   </>
                                                )
                                             })
                                          }
                                          <ListItem>
                                             <form onSubmit={(e) => {
                                                e.preventDefault()
                                                makeComment(e.target[0].value, item._id)
                                             }}>
                                                <TextField
                                                   id="input-with-icon-textfield"
                                                   label="Add a comment"
                                                />
                                             </form>
                                          </ListItem>
                                       </List>
                                 </AccordionDetails>
                              </Accordion>
                           </Card.Footer>
                        </Card>
                     </Paper>
                  </div>
               </Row>
              )
           })}
        </Container>
   )
}


export default SubUserPosts;