import React, { useState } from 'react';
import styles from '../Navbar/Navbar.module.css';
import { useHistory } from 'react-router-dom';
const Navbar = ({ isLogin, myData }) => {
  const history = useHistory();
  const titleBtnHandler = () => {
    history.push({
      pathname: '/',
    });
  };
  const loginBtnHandler = () => {
    history.push({
      pathname: '/login',
    });
  };

  const searchBtnHandler = () => {
    history.push({
      pathname: '/search',
    });
  };

  const writeBtnHandler = () => {
    history.push({
      pathname: '/write',
    });
  };

  return (
    <nav className={styles.nav}>
      {isLogin === false ? (
        <div className={styles.container}>
          <button className={styles.titleBtn} onClick={titleBtnHandler}>
            Record
          </button>
          <button className={styles.searchBtn} onClick={searchBtnHandler}>
            검색
          </button>
          <button className={styles.loginBtn} onClick={loginBtnHandler}>
            로그인
          </button>
        </div>
      ) : (
        <div className={styles.container}>
          <button className={styles.titleBtn} onClick={titleBtnHandler}>
            {myData ? `${myData.data.data.username}'s RECORD` : 'RECORD' }
          </button>
          <button className={styles.searchBtn} onClick={searchBtnHandler}>
            검색
          </button>
          <button className={styles.writeBtn} onClick={writeBtnHandler}>
            새글작성
          </button>
          <div className={styles.background}>
            <img
              className={styles.profile}
              src="/images/myimg.jpeg" //myData.data.profileImg값이 있으면 그걸 렌더 
              alt="profile"
            />
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
