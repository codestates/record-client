import React, { useState } from 'react';
import styles from '../Modal/LogoutModal.module.css';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const LogoutModal = ({ modalOff, clearToken, setLogout, accessToken }) => {
    const [ errMessage, setErrMessage ] = useState(false)
    const history = useHistory();
    const logoutBtnHandler = () => {
      //로그아웃이란?
        // users/logout으로 POST요청(바디에는 accessToken)하고 성공하면
        // app.js의 accessToken을 삭제하고, myData도 삭제, isLogin을 false로 바꾸고 모달창 끈다
      axios.
        post('http://localhost:4000/users/logout',
        { message: 'Logout request with accessToken' },{
          headers: {
              Authorization: `Bearer ${accessToken}`,
              "Content-Type": "application/json"
          },
          withCredentials: true
        }
        )
        .then((res) => {
            if (res.status === 200) {
              history.push({
                pathname: '/',
              });
              clearToken();
              setLogout();
              modalOff();
            }
            else if (res.status === 400) {
              alert('not authorized')
            } else {
              setErrMessage(true)
            }
        })
        .catch((err) => {
           console.log(err)
           setErrMessage(true)
        })
    }

    const closeModalHandler = () => {
      modalOff();
    }
    return (
        <div >
            <div className={styles.container}>
                <div className={styles.message}>
                  로그아웃 하시겠습니까?
                </div>
                <div className={styles.btnContainer}>
                    <button className={styles.yesBtn} onClick={logoutBtnHandler}>
                        예
                     </button>
                     <button className={styles.noBtn} onClick={closeModalHandler}>
                        아니오
                    </button>
                </div>
                <br />
                {errMessage && '로그아웃에 실패하였습니다. 연결상태를 확인하고 다시 시도해주세요.'}
            </div>
           
        </div>
    );
};

export default LogoutModal;