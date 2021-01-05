import React, { useState, useEffect } from 'react';
import styles from '../Mypage/Mypage.module.css'
import LogoutModal from '../Modal/LogoutModal'
import axios from 'axios';
import AvatarEditor from 'react-avatar-editor'
const base64js = require('base64-js')

const Mypage = ({ setMyData, myData, accessToken, isModalShow, modalOff, clearToken, setLogout }) => {
    const [intro, setIntro] = useState(false)
    const [introInfo, setIntroInfo] = useState({introduce: ''})


    const profileUp = () => {
 
      const getUrl = () => {
        return new Promise((resolve, reject) => {
          let file = document.getElementById('inputField')
          file.onchange = function (e) {
            let fileReader = new FileReader();
            console.log(e.target.files[0])
            fileReader.readAsDataURL(e.target.files[0])
            fileReader.onload = function (e) {
              window.sessionStorage.setItem('url', e.target.result)
              resolve(e.target.result)
            }
            fileReader.onerror = reject;
          }
        })
      }
      getUrl().then((pic) => {
        
        return axios
        .put('http://18.188.241.229/users/mypage/update',
        { ...myData, profileUrl: pic },
        {
          headers: { 
            'Content-Type': 'application/json',
             authorization: `Bearer ${accessToken}` 
          },
          withCredentials: true,
        }
      )
      .then(res => {
        if (res.status === 400) {
          alert('insufficient parameters supplied')
          document.getElementById('profile').src = "images/empty-profile.png"
        }else if (res.status === 401) {
          alert('not authorized')
          document.getElementById('profile').src = "images/empty-profile.png"
        } else { //here
          console.log(res.data.userInfo.profileUrl)
          const buff = Buffer.from(res.data.userInfo.profileUrl.data, 'base64')
          const profile = buff.toString('ascii')
          
          console.log(profile)
          setMyData({data: {
            ...myData,
            profileUrl: profile
          }})
          document.getElementById('profile').src = profile
          console.log(myData)

          console.log('프로필 이미지 업로드 성공')
        }
      })
      .catch(err => {
         console.log(err)
         document.getElementById('profile').src = "images/empty-profile.png"
       })
      })
      
    }

    const profileDelete = () => {
      axios
        .put('http://18.188.241.229/users/mypage/update',
        { ...myData, profileUrl: null },
        {
          headers: { 
            'Content-Type': 'application/json',
             authorization: `Bearer ${accessToken}` 
          },
          withCredentials: true,
        }
      )
      .then(res => {
        if (res.status === 401) {
          alert('not authorized')
        }else if (res.status === 400) {
          alert('insufficient parameters supplied')
        }else {
          document.getElementById('profile').src = "images/empty-profile.png"
/*           setMyData({data: {...myData, profileUrl: null}})
 */          window.sessionStorage.setItem('profile', null)
          console.log('프로필 이미지 삭제 성공')
          console.log(res)
        }
        })
      .catch(err => console.log('server err ' + err))
    }
    
    const introInputController = () => {
      setIntro(!intro)
    }
    
    const inputHandler = (e) => {
      let input = {...introInfo, [e.target.name] : e.currentTarget.value}
      setIntroInfo(input)
    }
    return (
        <div className={styles.mainContainer}>
           <section className={styles.profileInfo}>
                <div className={styles.thumbnail}>  
                    <img className={styles.thumbnailContainer} id="profile" src="images/empty-profile.png" />  {/* {!myData.data.data.profilUrl ? "images/empty-profile.png" : "/images/myimg.jpeg"} */}  
                    <form className={styles.input}  >
                      <label htmlFor="inputField" >프로필업로드</label>
                      <input onClick={profileUp} type="file" id="inputField" accept="image/jpeg, image/png" name="profileImg"/>
                    </form>
                    <button className={styles.deleteBtn} onClick={profileDelete}>프로필 삭제</button>
                </div>
                <div className={styles.nickDesc}>
                    <h2>{myData.username}</h2>
                    <p>{myData.introduce}</p>
                    {intro && <input placeholder="자기소개를 적어주세요" name="email" onChange={(e) => {inputHandler(e)}}></input>}
                    <button onClick={introInputController}>수정</button>
                </div>
            </section>
            <section className={styles.userInfo}> {/* 닉네임, githubUrl, email */}
                <div>
                    <div className={styles.wrapper}>
                        <h3 className={styles.infoName}>닉네임</h3>
                        <div className={styles.infoOne}>{myData.username}</div>
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
                
            </section>
            {isModalShow && <LogoutModal modalOff={modalOff} clearToken={clearToken} setLogout={setLogout} accessToken={accessToken}/>}
        </div>
    );
};

export default Mypage;