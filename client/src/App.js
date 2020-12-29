import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Search from './components/Search/Search';
import Post from './components/Post/Post';
import userSchema from './schema/user';
import postSchema from './schema/post';
const App = () => {
  const [userData, setUserData] = useState([]);
  const [postData, setPostData] = useState([]);
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    setUserData(userSchema);
    setPostData(postSchema);
  }, []);
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <LandingPage
              isLogin={isLogin}
              userData={userData}
              postData={postData}
            />
          </Route>
          <Route exact path="/login">
            <Login setIsLogin={setIsLogin} />
          </Route>
          <Route exact path="/register" component={Register} />
          <Route exact path="/search" component={Search} />
          <Route exact path="/write">
            <Post
              userData={userData}
              postData={postData}
              setPostData={setPostData}
            />
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
