import React, { useState } from 'react';
import styles from '../Register/Register.module.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
const Register = (props) => {
  const history = useHistory();

  const [registerInfo, setRegisterInfo] = useState({
    email: '',
    username: '',
    password: '',
    passwordCheck: '',
  });

  const registerHandler = (e) => {
    let register = { ...registerInfo, [e.target.name]: e.currentTarget.value };
    setRegisterInfo(register);
  };

  const registerBtnHanlder = () => {
    //axios 요청: 
    alert('회원가입이 성공했습니다');
    history.push({
      pathname: '/login',
    });
  };

  // const registerBtnHandler2 = () => {
  //   axios.post('localhost:4000/user/register', registerInfo).then((res) => {
  //     if (res.status(200)) {
  //       alert('회원가입이 성공했습니다');
  //       history.push({
  //         pathname: '/login',
  //       });
  //     } else {
  //       alert('회원가입이 실패했습니다');
  //     }
  //   });
  // };

  const loginBtnHandler = () => {
    history.push({
      pathname: '/login',
    });
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <img src="/images/logo.jpeg" alt="logo" className={styles.logoImg} />
        <p className={styles.description}>Record를 이용하려면 가입하세요</p>
        <input
          className={styles.registerInput}
          name="email"
          type="email"
          placeholder="이메일 주소"
          onChange={(e) => {
            registerHandler(e);
          }}
        />
        <input
          className={styles.registerInput}
          name="username"
          type="text"
          placeholder="사용자 이름"
          onChange={(e) => {
            registerHandler(e);
          }}
        />
        <input
          className={styles.registerInput}
          name="password"
          type="password"
          placeholder="비밀번호"
          onChange={(e) => {
            registerHandler(e);
          }}
        />
        <input
          className={styles.registerInput}
          name="passwordCheck"
          type="password"
          placeholder="비밀번호 확인"
          onChange={(e) => {
            registerHandler(e);
          }}
        />
        <button className={styles.btn} onClick={registerBtnHanlder}>
          <span>가입</span>
        </button>
      </div>
      <div className={styles.secondContainer}>
        <p className={styles.secondRegister}>
          이미 회원이신가요?
          <button className={styles.secondBtn} onClick={loginBtnHandler}>
            로그인하기
          </button>
        </p>
      </div>
    </section>
  );
};
export default Register;
