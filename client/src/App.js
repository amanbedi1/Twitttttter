import React,{useEffect,createContext,useReducer,useContext} from 'react';
import {BrowserRouter,Route,Switch, useHistory} from 'react-router-dom'
import NavBar from './components/NavBar'
import Home from './components/screens/Home'
import Signin from './components/screens/SignIn'
import Profile from './components/screens/Profile'
import UserProfile from './components/screens/UserProfile'
import Signup from './components/screens/Signup'
import CreatePost from './components/screens/CreatePost';
import {initialState, reducer} from './Reducers/userReducer'
import SubUserPosts from './components/screens/SubUserPosts';
import Search from './components/screens/Search';

export const UserContext = createContext()

const Routing = () => {
  const history = useHistory()
  const {state, dispatch} = useContext(UserContext)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))

    if(user) {
      dispatch({type: "USER", payload: user})
    }
    else {
      history.push("/signin")
    }

  }, [])

  return (
      <Switch>
        <Route exact path="/" >
          <Home />
        </Route>
        <Route path="/signin">
          <Signin />
        </Route>
        <Route path="/signup">
          <Signup />
        </Route>
        <Route exact path="/profile">
          <Profile />
        </Route>
        <Route path="/createpost">
          <CreatePost/>
        </Route>
        <Route path="/profile/:userid">
          <UserProfile/>
        </Route>
        <Route path="/followingpost">
          <SubUserPosts/>
        </Route>
        <Route path="/search">
          <Search/>
        </Route>
      </Switch>
  )
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState)
  return (
    <UserContext.Provider value={{state, dispatch}}>
      <BrowserRouter>
        <NavBar />
        <Routing />
      </BrowserRouter>
    </UserContext.Provider>
  );
}

export default App;
