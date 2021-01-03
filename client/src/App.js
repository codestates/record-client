import './App.css';
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage/LandingPage';
import Login from './components/Login/Login';
import Register from './components/Register/Register';
import Search from './components/Search/Search';
import Post from './components/Post/Post';
import Navbar from './components/Navbar/Navbar';
import Detail from './components/Detail/Detail';
import Mypage from './components/Mypage/Mypage'
import MainPage from './components/MainPage/MainPage'
import userSchema from './schema/user';
import postSchema from './schema/post';
const App = () => {
  const [userData, setUserData] = useState([]); //cardlist로 렌더되는 데이터(post테이블에서 시간순으로)
  const [postData, setPostData] = useState([]);
  const [isLogin, setIsLogin] = useState(false);
  const [accessToken, setAccessToken] = useState(''); //로그인 요청의 응답으로 받은 토큰
  const [myData, setMyData] = useState({ data: null });
  const [isModalShow, setIsModalShow] = useState(false)
  //로그인한 사용자의 데이터, 어떤 컴포넌트로 내려줘야 할까?
  useEffect(() => {
    setUserData(userSchema);
    setPostData(postSchema);
    const data = sessionStorage.getItem('data')
    if (data) {
      setIsLogin(true)
      setMyData({data: JSON.parse(data) })
    }else {
      setIsLogin(false)
    }
  }, []);


  const inputMyInfo = (userInfo) => {
    setMyData({
      data: userInfo,
    });
  };

  const handleModal = () => {
    setIsModalShow(!isModalShow)
  };

  const clearAccessToken = () => {
    setAccessToken('')
  }

  const setLogout = () => {
    setMyData({data: null})
    setIsLogin(false)
  }
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/">
            <Navbar isLogin={isLogin} myData={myData} handleModal={handleModal} />
            <LandingPage userData={userData} postData={postData} isModalShow={isModalShow} accessToken={accessToken} modalOff={handleModal} clearToken={clearAccessToken} setLogout={setLogout} setMyData={setMyData}/>
          </Route>
          <Route exact path="/login">
            <Login
              setIsLogin={setIsLogin}
              setAccessToken={setAccessToken}
              inputMyInfo={inputMyInfo}
            />
          </Route>닉네임
          <Route exact path="/register" component={Register} />
          <Route exact path="/search">
            <Navbar isLogin={isLogin} myData={myData} handleModal={handleModal}/>
            <Search isModalShow={isModalShow} accessToken={accessToken} modalOff={handleModal} clearToken={clearAccessToken} setLogout={setLogout}/>
          </Route>
          <Route exact path="/write">
            <Post
              userData={userData}
              postData={postData}
              setPostData={setPostData}
            />
          </Route>
          <Route path="/detail">
            <Navbar isLogin={isLogin} myData={myData.data} handleModal={handleModal}/>
            <Detail userData={userData} isModalShow={isModalShow} myData={myData.data} accessToken={accessToken} modalOff={handleModal} clearToken={clearAccessToken} setLogout={setLogout} />
          </Route>
          <Route exact path="/mypage">
            <Navbar isLogin={isLogin} myData={myData.data} handleModal={handleModal}/> 
            <Mypage isModalShow={isModalShow} myData={myData.data} accessToken={accessToken} modalOff={handleModal} clearToken={clearAccessToken} setLogout={setLogout}/>
          </Route>
          <Route exact path="/mainpage">
            <Navbar isLogin={isLogin} myData={myData.data} handleModal={handleModal}/>
            <MainPage isModalShow={isModalShow} myData={myData.data} accessToken={accessToken} modalOff={handleModal} clearToken={clearAccessToken} setLogout={setLogout}/>
          </Route>
        </Switch>
      </Router>
    </>
  );
};

export default App;
