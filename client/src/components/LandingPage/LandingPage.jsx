import React, { useState } from 'react';
import styles from '../LandingPage/LandingPage.module.css';
/* import Navbar from '../Navbar/Navbar'; */
import Cardlist from '../Card/Card_list';
import LogoutModal from '../Modal/LogoutModal';
const LandingPage = ({
  posts,
  users,
  isModalShow,
  modalOff,
  clearToken,
  setLogout,
  accessToken,
}) => {
  return (
    <div className={styles.mainContainer}>
      <div className={styles.container}>
        <Cardlist posts={posts} users={users} />
      </div>
      {isModalShow && (
        <LogoutModal
          modalOff={modalOff}
          clearToken={clearToken}
          setLogout={setLogout}
          accessToken={accessToken}
        />
      )}
    </div>
  );
};

export default LandingPage;
