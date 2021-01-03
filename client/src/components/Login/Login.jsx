import React, { useState, useEffect } from 'react';
import styles from '../Login/Login.module.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const Login = ({ setIsLogin, setAccessToken, inputMyInfo }) => {
  const history = useHistory();

  const [loginInfo, setLoginInfo] = useState({ email: '', password: '' });
  const [message, setMessage] = useState('')

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
    const { email, password } = loginInfo;
    let emailReg = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    let passwordReg = /^[a-zA-z]+[a-zA-Z0-9!@#$]{7,19}$/

    if (email === '' || !emailReg.test(email)) {
      setMessage("이메일을 입력하지 않았거나 형식이 알맞지 않습니다.")
      return;
    }else if (password === '' || !passwordReg.test(password)) {
      setMessage("비밀번호는 8~20개의 알파벳 대소문자, 숫자, 특수문자(!, @, #, $)의 조합으로 입력해주시기 바랍니다.")
      return;
    }
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
          alert('invalid access token');
        }else if (res.status === 401) {
          alert('access token has been tempered')
        }
        setAccessToken(res.data.accessToken);
        window.sessionStorage.setItem('token', res.data.accessToken)
        return res.data.accessToken;
      })
      .then((token) => {
        return axios
          .get('http://localhost:4000/users/accessTokenRequest', {
            headers: {
              authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            withCredentials: true,
          })
          .then((userInfo) => {
            /* 에러핸들링: 토큰 없을 때, 토큰이 유효하지 않을 때 조건문 추가*/
            console.log(userInfo)
            inputMyInfo(userInfo.data.userInfo);
            setIsLogin(true);
            window.sessionStorage.setItem('data', JSON.stringify(userInfo.data.userInfo))
            history.push({
              pathname: '/',
            });
          })
          .catch((err) => console.log(`server err: ${err}`));
      });
  };

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
        <div className={styles.message}>{message}</div>
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
