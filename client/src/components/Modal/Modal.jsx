import React from 'react';
import styles from '../Modal/Modal.module.css';
const Modal = (props) => {
  return (
    <div className={styles.container}>
      <div>내블로그</div>
      <div>로그아웃</div>
      <div>Mypage</div>
    </div>
  );
};

export default Modal;
