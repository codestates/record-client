import React, { useState } from 'react';
import styles from '../Mypage/Mypage.module.css'
import LogoutModal from '../Modal/LogoutModal'
import axios from 'axios';

const Mypage = ({ myData, accessToken, isModalShow, modalOff, clearToken, setLogout }) => {
    console.log(myData)
    const profileUp = () => {
      // users/mypage/update
      // 이미지 업로드 과정 질문하기 
      // PUT 메소드로 어떻게 내 정보 수정하는지 알아보기
      axios
        .put('http://localhost:4000/users/mypage/update',
        { data: {userInfo: {profileUrl: ""}} },
        {
          headers: { 'Content-Type': 'application/json', authorizaiton: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      )
      .then(res => {
        console.log('프로필 이미지 업로드 성공')
        if (res.status === 401) {
            alert(res.message)
        }
      })
      .catch(err => console.log(err))
    }

    const profileDelete = () => {
      axios
        .put('http://localhost:4000/users/update',
        { data: {userInfo: {profileUrl: null} } },
        {
          headers: { 'Content-Type': 'application.json', authorization: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      )
      .then(res => {
          console.log('프로필 이미지 삭제 성공')
          if (res.status === 401) {
              alert(res.message)
          }
        })
      .catch(err => console.log(err))
    }

    const descHandler = () => {
      // users/mypage/update PUT
    }
    return (
        <div className={styles.mainContainer}>
            <section className={styles.profileInfo}>
                <div className={styles.thumbnail}>  
                    <img className={styles.thumbnailContainer} src={!myData.data.data.profilUrl ? "images/empty-profile.png" : "/images/myimg.jpeg"} />
                    <button className={styles.uploadBtn} onClick={profileUp}>프로필 업로드</button>
                    <button className={styles.deleteBtn} onClick={profileDelete}>프로필 삭제</button>
                </div>
                <div className={styles.nickDesc}>
                    <h2>{myData.data.data.username}</h2>
                    <p>{myData.data.data.introduce}</p>
                    <button className={styles.uploadBtn} onClick={descHandler}>수정</button>
                </div>
            </section>
            <section className={styles.userInfo}> {/* 닉네임, githubUrl, email */}
                <div>
                    <div className={styles.wrapper}>
                        <h3 className={styles.infoName}>닉네임</h3>
                        <div className={styles.infoOne}>{myData.data.data.nickname}</div>
                    </div>
                    <div className={styles.description}>회원가입할 때 등록한 닉네임입니다.</div>
                    <hr/>
                </div>
                <div>
                    <div className={styles.wrapper}>
                        <h3 className={styles.infoName}>email</h3>
                        <div className={styles.infoTwo}>{myData.data.data.nickname}</div>
                    </div>
                    <div className={styles.description}>회원가입할 때 등록한 이메일입니다.</div>
                    <hr/>
                </div>
                <div>
                    <div className={styles.wrapper}>
                        <h3 className={styles.infoName}>githubUrl</h3>
                        <div className={styles.infoThree}>{myData.data.data.githubUrl}</div>
                    </div>
                    <div className={styles.description}>깃허브 url입니다</div>
                    <hr/>
                </div>
            </section>
            {isModalShow && <LogoutModal modalOff={modalOff} clearToken={clearToken} setLogout={setLogout} accessToken={accessToken}/>}
        </div>
    );
};

export default Mypage;