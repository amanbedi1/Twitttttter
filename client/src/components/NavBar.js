import React,{useContext, useState} from 'react'
import { Container, Modal, Nav, Navbar } from 'react-bootstrap'
import {Link, useHistory} from 'react-router-dom'
import {UserContext} from '../App'
import Button from '@material-ui/core/Button';
import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import InboxIcon from '@material-ui/icons/Inbox';
import ExploreIcon from '@material-ui/icons/Explore';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import PostAddIcon from '@material-ui/icons/PostAdd';
import SearchIcon from '@material-ui/icons/Search';

const NavBar = ()=>{

    const [expanded, setExpanded] = useState(false);
    const {state, dispatch} = useContext(UserContext)
    const history = useHistory()
    
    const renderNav = () => {
      if(state) {
        return  (
          <>
            <Nav className="mr-auto">
              <Link to="/" className="nav-link" onClick={() => setExpanded(false)}>
                <Button
                  size="large"
                  startIcon={<ExploreIcon/>}
                >
                  Explore
                </Button>
              </Link>

              <Link to="/followingpost" className="nav-link" onClick={() => setExpanded(false)}>
                <Button
                  size="large"
                  startIcon={<InboxIcon/>}
                >
                  Feed
                </Button>
              </Link>

              <Link to="/createpost" className="nav-link" onClick={() => setExpanded(false)}>
                <Button
                  size="large"
                  startIcon={<PostAddIcon/>}
                >
                  Post
                </Button>
              </Link>

              <Link to="/search" className="nav-link" onClick={() => setExpanded(false)}>
                <Button
                    size="large"
                    startIcon={<SearchIcon/>}
                >
                  Search
                </Button>
              </Link>
            </Nav>
            <Nav>
              <Link to="/profile" className="nav-link" onClick={() => setExpanded(false)}>
                <Button
                  size="large"
                  endIcon={<AccountCircleIcon/>}
                >
                  Profile
                </Button>
              </Link>
              <Link className="nav-link" onClick={() => setExpanded(false)}>
                <Button
                  size="large" 
                  variant="contained" 
                  color="secondary"
                  endIcon={<ExitToAppIcon/>}
                  onClick={() => {
                    localStorage.clear()
                    dispatch({type: "CLEAR"})
                    history.push('/signin')
                  }}
                >
                  Logout
                </Button>
              </Link>
            </Nav>
          </>
        )
      }
      else {
        return (
          <>
            <Nav className="ml-auto">
              <Link to="/signin" className="nav-link" onClick={() => setExpanded(false)}>
                <Button
                  size="large"
                >
                  Sign In
                </Button>
              </Link>
              <Link to="/signup" className="nav-link" onClick={() => setExpanded(false)}>
                <Button
                  size="large"
                >
                  Sign Up
                </Button>
              </Link>
            </Nav>
          </>
        )
      }
    }

    return(
      <Navbar expanded={expanded} className="main-navbar" fixed="top" expand="lg">
        <Container>
          <Navbar.Brand href="#home">Twittttter</Navbar.Brand>
          <Navbar.Toggle onClick={() => setExpanded(expanded ? false : "expanded")} aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            {renderNav()}
          </Navbar.Collapse>
      </Container>
    </Navbar>
    )
}


export default NavBar