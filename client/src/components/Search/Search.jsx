import React, { useState } from 'react';
import styles from '../Search/Search.module.css';
import Navbar from '../Navbar/Navbar';
import LogoutModal from '../Modal/LogoutModal'

const Search = ({ accessToken, modalOff, clearToken, setLogout, isModalShow}) => {
  const [search, setSearch] = useState('');

  const searchInputHandler = (event) => {
    setSearch(event.currentTarget.value);
  };
  return (
    <div className={styles.container}>
      <div className={styles.inputContainer}>
        <div className={styles.inputs}>
          <input
            onChange={searchInputHandler}
            placeholder="검색어를 입력하세요"
          />
        </div>
      </div>
      {isModalShow && <LogoutModal modalOff={modalOff} clearToken={clearToken} setLogout={setLogout} accessToken={accessToken}/>}
    </div>
  );
};

export default Search;
