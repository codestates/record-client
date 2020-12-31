import React, { useState } from 'react';
import styles from '../Login/Login.module.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const Login = ({ setIsLogin, setAccessToken, inputMyInfo }) => {
  const history = useHistory();

  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const loginHandler = (e) => {
    let login = { ...loginInfo, [e.target.name]: e.currentTarget.value };
    setLoginInfo(login);
  };

  const registerBtnHanlder = () => {
    history.push({
      pathname: '/register',
    });
  };

  const loginBtnHandler = () => {
    /* 
      로그인 요청: 
      1. 토큰을 받아오는 데 성공하면 토큰을 App의 상태에 저장하고 isLogin의 상태를 변경한다.
        1.1 응답객체의 형태 { "access_token": access_token, "message": "token issued OK"} 
      2. 유저정보(profileImg)를 가져와서 isLogin=true Nav바에 프로필 사진을 렌더한다
        2.1 지금 코드에서 App.js의 myData에 담아준다
        2.2 LandingPage => Navbar로 props drilling
        2.3 isLogin=true로 렌더되는 부분의 Nav의 프로필사진에 데이터연결
          2.3.1 이미지가 데이터베이스에 어떻게 될건지 백엔드분들에게 여쭤보기 
    */
    const { email, password } = loginInfo;
    axios
      .post(
        'http://localhost:4000/users/login',
        { email, password },
        {
          headers: { 'Content-Type': 'application/json' },
          withCredentials: true,
        }
      )
      .then((res) => {
        if (res.status === 400) {
          alert('일치하는 유저정보가 없습니다');
        }
        setAccessToken(res.data.data.accessToken);
        return res.data.data.accessToken;
      })
      .then((token) => {
        return axios
          .get('http://localhost:4000/accessTokenRequest', {
            headers: {
              authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          })
          .then((userInfo) => {
            /* 에러핸들링: 토큰 없을 때, 토큰이 유효하지 않을 때 조건문 추가*/
            inputMyInfo(userInfo);
            setIsLogin(true);
            history.push({
              pathname: '/',
            });
          })
          .catch((err) => console.log(`server err: ${err}`));
      });
  };

  // const loginBtnHanlder2 = () => {
  //   axios.post('localhost4000:user/login', loginInfo)
  //   .then(res => {
  //     if(res.status(200)) {
  //       setIsLogin(true);
  //       history.push({
  //         pathname: '/',
  //       });
  //     }
  //   })
  // }

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <img src="/images/logo.jpeg" alt="logo" className={styles.logoImg} />
        <input
          name="email"
          className={styles.loginInput}
          type="email"
          placeholder="사용자 이메일"
          onChange={(e) => {
            loginHandler(e);
          }}
        />
        <input
          name="password"
          className={styles.loginInput}
          type="password"
          placeholder="비밀번호"
          onChange={(e) => {
            loginHandler(e);
          }}
        />
        <button className={styles.btn} onClick={loginBtnHandler}>
          <span>로그인</span>
        </button>
        <div className={styles.borderText}>또는</div>
      </div>
      <div className={styles.secondContainer}>
        <p className={styles.secondRegister}>
          아직 회원이 아니신가요?
          <button className={styles.secondBtn} onClick={registerBtnHanlder}>
            가입하기
          </button>
        </p>
      </div>
    </section>
  );
};

export default Login;
