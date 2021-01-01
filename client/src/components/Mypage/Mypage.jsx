import React, { useState } from 'react';
import styles from '../Mypage/Mypage.module.css'
const Mypage = () => {
    const [userInfo, setUserInfo] = useState({}) 
    return (
        <div className={styles.mainContainer}>
            <section className={styles.profileInfo}>
                <div className={styles.thumbnail}>  
                    <img className={styles.thumbnailContainer} src="/images/myimg.jpeg" />
                    <button className={styles.uploadBtn}>프로필 업로드</button>
                    <button className={styles.deleteBtn}>프로필 삭제</button>
                </div>
                <div className={styles.nickDesc}>
                    <h2>닉네임 from user</h2>
                    <p>저는 어쩌구 저쩌구 입니다</p>
                    <button className={styles.uploadBtn}>수정</button>
                </div>
            </section>
            <section className={styles.userInfo}> {/* 닉네임, githubUrl, email */}
                <div>
                    <div className={styles.wrapper}>
                        <h3 className={styles.infoName}>닉네임</h3>
                        <div className={styles.infoOne}>내용</div>
                    </div>
                    <div className={styles.description}>회원가입할 때 등록한 닉네임입니다.</div>
                    <hr/>
                </div>
                <div>
                    <div className={styles.wrapper}>
                        <h3 className={styles.infoName}>email</h3>
                        <div className={styles.infoTwo}>내용</div>
                    </div>
                    <div className={styles.description}>회원가입할 때 등록한 이메일입니다.</div>
                    <hr/>
                </div>
                <div>
                    <div className={styles.wrapper}>
                        <h3 className={styles.infoName}>githubUrl</h3>
                        <div className={styles.infoThree}>내용</div>
                    </div>
                    <div className={styles.description}>깃허브 url입니다</div>
                    <hr/>
                </div>
            </section>
        </div>
    );
};

export default Mypage;