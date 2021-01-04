import React, { useState, useEffect } from 'react';
import styles from '../Mypage/Mypage.module.css'
import LogoutModal from '../Modal/LogoutModal'
import axios from 'axios';


const Mypage = ({ setMyData, myData, accessToken, isModalShow, modalOff, clearToken, setLogout }) => {
    const [Url, setUrl] = useState('')

    const profileUp = async () => {
 
      const getUrl = () => {
        return new Promise((resolve, reject) => {
          let file = document.getElementById('inputField')
          file.onchange = function (e) {
            let fileReader = new FileReader();
            fileReader.readAsArrayBuffer(e.target.files[0])
            fileReader.onload = function (e) {
              window.sessionStorage.setItem('url', e.target.result)
              resolve(e.target.result)
            }
            fileReader.onerror = reject;
          }
        })
      }
      getUrl().then((pic) => {
        console.log(pic)

        let arrayBufferView = new Uint8Array(pic)
        let blob = new Blob([arrayBufferView], {type: 'image/png'})
        console.log(blob)
        let urlCreator = window.URL || window.webkitURL;
        let imageUrls = urlCreator.createObjectURL(blob)
        console.log(imageUrls)
        document.getElementById('profile').src = imageUrls

        return axios
        .put('http://localhost:4000/users/mypage/update',
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
        } else {
          console.log(res.data.userInfo.profileUrl)
/*           let arrayBufferView = new Uint8Array(res.data.userInfo.profileUrl.data)
          let blob = new Blob([arrayBufferView], {type: 'image/png'})
          console.log(blob)
          let urlCreator = window.URL || window.webkitURL;
          let imageUrls = urlCreator.createObjectURL(blob)
          console.log(imageUrls)
 */           

        

          
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
        .put('http://localhost:4000/users/mypage/update',
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
          //app.js의 유저정보에 profileUrl을 추가한다
          //그렇게 추가한 경로를 img.src에 써주면 렌더가 되는 건가?
          document.getElementById('profile').src = "images/empty-profile.png"
/*           setMyData({data: {...myData, profileUrl: null}})
 */          window.sessionStorage.setItem('profile', null)
          console.log('프로필 이미지 삭제 성공')
          console.log(res)
        }
        })
      .catch(err => console.log('server err ' + err))
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
            </section>
            {isModalShow && <LogoutModal modalOff={modalOff} clearToken={clearToken} setLogout={setLogout} accessToken={accessToken}/>}
        </div>
    );
};

export default Mypage;