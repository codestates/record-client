import React, { useState } from 'react';
import styles from '../Login/Login.module.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const Login = ({ setIsLogin }) => {
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
    setIsLogin(true);
    history.push({
      pathname: '/',
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
