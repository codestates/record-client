import React, { useState } from 'react';
import styles from '../Navbar/Navbar.module.css';
import { useHistory } from 'react-router-dom';
import Modal from '../Modal/Modal'
const Navbar = ({ isLogin, myData, handleModal }) => {
  const history = useHistory();
  const [isModal, setIsModal] = useState(false)

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

  const modalHandler = () => {
    setIsModal(!isModal)
    console.log(isModal)
  }
  return (
    <div className={styles.mainContainer}>
      <nav className={styles.nav}>
        {isLogin === false ? (
          <div className={styles.container}>
            <button className={styles.titleBtn} onClick={titleBtnHandler}>
              Record
            </button>
            <button className={styles.searchBtn} onClick={searchBtnHandler}>
              <svg width="17" height="17" viewBox="0 0 17 17">
                <path
                  fillRule="evenodd"
                  d="M13.66 7.36a6.3 6.3 0 1 1-12.598 0 6.3 6.3 0 0 1 12.598 0zm-1.73 5.772a7.36 7.36 0 1 1 1.201-1.201l3.636 3.635c.31.31.31.815 0 1.126l-.075.075a.796.796 0 0 1-1.126 0l-3.636-3.635z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <button className={styles.loginBtn} onClick={loginBtnHandler}>
              로그인
            </button>
          </div>
        ) : (
          <div className={styles.container}>
            <button className={styles.titleBtn} onClick={titleBtnHandler}>
              Record
            </button>
            <button className={styles.searchBtn} onClick={searchBtnHandler}>
              <svg width="17" height="17" viewBox="0 0 17 17">
                <path
                  fillRule="evenodd"
                  d="M13.66 7.36a6.3 6.3 0 1 1-12.598 0 6.3 6.3 0 0 1 12.598 0zm-1.73 5.772a7.36 7.36 0 1 1 1.201-1.201l3.636 3.635c.31.31.31.815 0 1.126l-.075.075a.796.796 0 0 1-1.126 0l-3.636-3.635z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
            <button className={styles.writeBtn} onClick={writeBtnHandler}>
              새글작성
            </button>
            <div className={styles.profileContainer}>
              <div className={styles.background} onClick={modalHandler}>
                <img
                  className={styles.profile}
                  src="/images/myimg.jpeg" //myData.data.profileImg값이 있으면 그걸 렌더
                  alt="profile"
                />
              </div>
              
            </div>
           <div className={styles.modalContainer} >
                  {isModal && <Modal handleModal={handleModal} />}
              </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
