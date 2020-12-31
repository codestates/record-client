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
  console.log(registerInfo)
  const { email, username, password, passwordCheck } = registerInfo
  const [message, setMessage] = useState('')
  const registerHandler = (e) => {
    let register = { ...registerInfo, [e.target.name]: e.currentTarget.value };
    setRegisterInfo(register);
  };

  const registerBtnHanlder = () => {
    let usernameReg = /^[a-z]+[a-z0-9-_]{6,16}$/
    let passwordReg = /^[a-zA-z]+[a-zA-Z0-9!@#$]{7,19}$/
    let emailReg = /([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    
    if (email === '' || !emailReg.test(email)) {
      setMessage("이메일을 입력하지 않았거나 형식이 알맞지 않습니다.")
      return;
    }else if (username === '' || !usernameReg.test(username)) {
      setMessage("사용자 이름은 7~17개의 알파벳 소문자, 숫자, 특수문자 '-'와 '_'의 조합으로 입력해주시기 바랍니다.")
      return;
    }else if (password !== passwordCheck) {
      setMessage("비밀번호가 일치하지 않습니다")
      return;
    }else if (password === '' || !passwordReg.test(password)) {
      setMessage("비밀번호는 8~20개의 알파벳 대소문자, 숫자, 특수문자(!, @, #, $)의 조합으로 입력해주시기 바랍니다.")
      return;
    }

  axios
    .post("http://localhost:4000/users/register",
    { email, username, password, passwordCheck },{
      headers: { 
        "Content-Type": "application/json" }, 
         withCredentials: true 
      }
    )
    .then(res => {
      if (res.status === 409) {
        setMessage('이미 존재하는 이메일입니다.')
      }else if (res.status === 422) {
        setMessage('email, password, username을 입력해 주세요.')
      }else if (res.status === 201){
        alert('회원가입에 성공했습니다. 로그인해주세요');
        history.push({
          pathname: '/login',
        });
      }
    })
    .catch(err => console.log(err))
  };


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
        <div className={styles.message}>{message}</div>
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
