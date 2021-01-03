import React, { useState } from 'react';
import styles from '../Mypage/Mypage.module.css'
import LogoutModal from '../Modal/LogoutModal'
import axios from 'axios';

const Mypage = ({ myData, accessToken, isModalShow, modalOff, clearToken, setLogout }) => {
    const profileUp = () => {
      const selectedFile = document.getElementById('inputField').files[0];
      console.log(selectedFile)
      axios
        .put('http://localhost:4000/users/mypage/update',
        { data: {userInfo: {profileUrl: selectedFile}} },
        {
          headers: { 'Content-Type': 'application/json', authorizaiton: `Bearer ${accessToken}` },
          withCredentials: true,
        }
      )
      .then(res => {
        if (res.status === 401) {
            alert(res.message)
        }
        console.log('프로필 이미지 업로드 성공')
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
          if (res.status === 200) {
            //app.js의 유저정보에 profileUrl을 추가한다
            //그렇게 추가한 경로를 img.src에 써주면 렌더가 되는 건가?
            console.log('프로필 이미지 삭제 성공')
          }
          if (res.status === 401) {
              alert(res.message)
          }
        })
      .catch(err => console.log(err))
    }

    const descHandler = () => {
      // users/mypage/update PUT
      axios
        .put('http://localhost:4000/users/update',)
    }
    return (
        <div className={styles.mainContainer}>
            <section className={styles.profileInfo}>
                <div className={styles.thumbnail}>  
                    <img className={styles.thumbnailContainer} src="images/empty-profile.png"/>  {/* {!myData.data.data.profilUrl ? "images/empty-profile.png" : "/images/myimg.jpeg"} */}  
                    <div className={styles.input}>
                      <label htmlFor="inputField" >프로필업로드</label>
                      <input onClick={profileUp} type="file" id="inputField" accept="image/jpeg, image/png" name="profileImg"/>
                    </div>
                    <button className={styles.deleteBtn} onClick={profileDelete}>프로필 삭제</button>
                </div>
                <div className={styles.nickDesc}>
                    <h2>{myData.username}</h2>
                    <p>{myData.introduce}</p>
                    <button className={styles.uploadBtn} onClick={descHandler}>수정</button>
                </div>
            </section>
            <section className={styles.userInfo}> {/* 닉네임, githubUrl, email */}
                <div>
                    <div className={styles.wrapper}>
                        <h3 className={styles.infoName}>닉네임</h3>
                        <div className={styles.infoOne}>{myData.nickname}</div>
                    </div>
                    <div className={styles.description}>회원가입할 때 등록한 닉네임입니다.</div>
                    <hr/>
                </div>
                <div>
                    <div className={styles.wrapper}>
                        <h3 className={styles.infoName}>email</h3>
                        <div className={styles.infoTwo}>{myData.email}</div>
                    </div>
                    <div className={styles.description}>회원가입할 때 등록한 이메일입니다.</div>
                    <hr/>
                </div>
                <div>
                    <div className={styles.wrapper}>
                        <h3 className={styles.infoName}>githubUrl</h3>
                        <div className={styles.infoThree}>{myData.githubUrl}</div>
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