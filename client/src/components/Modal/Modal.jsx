import React from 'react';
import styles from '../Modal/Modal.module.css';
import { useHistory } from 'react-router-dom';
const Modal = ({ handleModal }) => {
  const history = useHistory()
  const myBlogHandler = () => {
    console.log('내블로그')
  };
  
  const logoutModalHandler = () => {
    handleModal();  //로그아웃 모달창 띄우기
  };

  const myPageHandler = () => {
    console.log('내정보페이지')
    history.push({
      pathname: '/mypage'
    })
  };
  return (
    <div className={styles.container}>
      <div onClick={myBlogHandler}>내블로그</div>
      <div onClick={logoutModalHandler}>로그아웃</div>
      <div onClick={myPageHandler}>Mypage</div>
    </div>
  );
};

export default Modal;
