import React, { useState, useEffect } from 'react';
import styles from '../Detail/Detail.module.css';
import LogoutModal from '../Modal/LogoutModal';
import axios from 'axios';
const Detail = ({
  isModalShow,
  accessToken,
  modalOff,
  clearToken,
  setLogout,
}) => {
  const [comments, setComments] = useState([]);
  const [post, setPost] = useState([]);
  const [user, setUser] = useState([]);
  let currentUrl = window.location.href.split('/')[4];
  const [usercomment, setUsercomment] = useState({
    id: '',
    comment: '',
    username: '',
    postId: currentUrl,
    userImg: '',
    created_at: '',
    update_at: '',
  });

  const commentBtnHandler = (e) => {
    let newComment = { ...usercomment, [e.target.name]: e.currentTarget.value };
    setUsercomment(newComment);
  };

  const btn = () => {
    let commentUpdate = [...comments];
    commentUpdate.push(usercomment);
    setUsercomment(commentUpdate);
  };

  useEffect(() => {
    let currentUrl = window.location.href.split('/')[4];
    axios.get(`http://18.188.241.229/posts/${currentUrl}/read`).then((res) => {
      if (res.status === 200) {
        setPost(res.data.postData);
        setUser(res.data.userInfo);
      }
    });
    axios
      .get(`http://18.188.241.229/comments/post/${currentUrl}/read`)
      .then((res) => {
        setComments(res.data);
      });
  }, []);

  return (
    <section className={styles.mainContainer}>
      <div className={styles.container}>
        {/* Header */}
        <article>
          <div className={styles.titleContainer}>
            <h1 className={styles.title}>{post.title}</h1>
            <div className={styles.spanContainer}>
              <span className={styles.nickname}>{user.username}</span>
              <span className={styles.circle}>·</span>
              <span className={styles.date}>{post.createdAt}</span>
              <div className={styles.secondTitle}>
                <svg
                  className={styles.svgbox}
                  width="32"
                  height="48"
                  fill="none"
                  viewBox="0 0 32 48"
                >
                  <path
                    fill="#12B886"
                    d="M32 0H0v48h.163l16-16L32 47.836V0z"
                  ></path>
                </svg>
                <h1>{post.title}</h1>
              </div>
            </div>
          </div>
        </article>
        {/* Content */}
        <article>
          <div className={styles.contentImgContainer}>
            <img className={styles.contentImg} src={post.imageUrl} alt="" />
          </div>
          <div className={styles.contentContainer}>
            <p className={styles.content}>{post.contents}</p>
          </div>
        </article>

        {/* Footer */}
        <article>
          <div className={styles.footerContainer}>
            <img
              className={styles.footerUserImg}
              src={user.profileUrl}
              alt=""
            />
            <div>
              <h2 className={styles.footerUsername}>{user.username}</h2>
            </div>
          </div>
          <div className={styles.footerLine}></div>
          <div className={styles.social}>
            <div className={styles.github}>
              <a
                href="https://github.com/MiaJLee"
                target="_blank"
                rel="noopener noreferrer"
                data-testid="github"
              >
                <svg
                  width="32"
                  height="32"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <mask
                    id="github"
                    width="20"
                    height="20"
                    x="0"
                    y="0"
                    maskUnits="userSpaceOnUse"
                  >
                    <path
                      fill="#ffffff"
                      fillRule="evenodd"
                      d="M6.69 15.944c0 .08-.093.145-.21.145-.133.012-.226-.053-.226-.145 0-.081.093-.146.21-.146.12-.012.226.053.226.146zm-1.255-.182c-.028.08.053.173.174.198.105.04.226 0 .25-.081.024-.08-.053-.173-.174-.21-.104-.028-.221.012-.25.093zm1.783-.068c-.117.028-.198.104-.186.197.012.08.117.133.238.105.117-.028.198-.105.186-.186-.012-.076-.121-.129-.238-.116zM9.87.242C4.278.242 0 4.488 0 10.08c0 4.471 2.815 8.298 6.835 9.645.516.093.697-.226.697-.488 0-.25-.012-1.63-.012-2.476 0 0-2.822.605-3.415-1.202 0 0-.46-1.173-1.121-1.475 0 0-.924-.633.064-.621 0 0 1.004.08 1.557 1.04.883 1.557 2.363 1.109 2.94.843.092-.645.354-1.093.645-1.36-2.255-.25-4.529-.576-4.529-4.455 0-1.109.307-1.665.952-2.375-.105-.262-.448-1.342.105-2.738C5.56 4.157 7.5 5.51 7.5 5.51a9.474 9.474 0 0 1 2.532-.344c.86 0 1.726.117 2.533.343 0 0 1.939-1.355 2.782-1.089.552 1.4.21 2.476.105 2.738.645.714 1.04 1.27 1.04 2.375 0 3.891-2.375 4.202-4.63 4.456.372.319.686.923.686 1.87 0 1.36-.012 3.041-.012 3.372 0 .262.186.58.698.488C17.266 18.379 20 14.552 20 10.08 20 4.488 15.464.24 9.871.24zM3.919 14.149c-.052.04-.04.133.029.21.064.064.157.093.21.04.052-.04.04-.133-.029-.21-.064-.064-.157-.092-.21-.04zm-.435-.326c-.028.052.012.117.093.157.064.04.145.028.173-.028.028-.053-.012-.117-.093-.158-.08-.024-.145-.012-.173.029zm1.306 1.435c-.064.053-.04.174.053.25.092.093.21.105.262.04.052-.052.028-.173-.053-.25-.088-.092-.21-.104-.262-.04zm-.46-.593c-.064.04-.064.146 0 .238.065.093.174.133.226.093.065-.053.065-.157 0-.25-.056-.093-.16-.133-.225-.08z"
                      clipRule="evenodd"
                    ></path>
                  </mask>
                  <g mask="url(#github)">
                    <path fill="currentColor" d="M0 0h20v20H0z"></path>
                  </g>
                </svg>
              </a>
            </div>
            <div className={styles.email}>
              <a href={`mailto:${user.email}`}>
                <svg
                  width="32"
                  height="32"
                  fill="none"
                  viewBox="0 0 32 32"
                  data-testid="email"
                >
                  <path
                    fill="currentColor"
                    d="M16 16.871L1.019 5H30.98L16 16.871zm0 3.146L1 8.131V27h30V8.131L16 20.017z"
                  ></path>
                </svg>
              </a>
            </div>
          </div>
        </article>

        <article>
          <div className={styles.commentContainer}>
            {comments.commentData === undefined ? (
              <h4>0개의 댓글</h4>
            ) : (
              <h4>{comments.length}개의 댓글</h4>
            )}
            <textarea
              className={styles.commentText}
              name="comment"
              onChange={(e) => {
                commentBtnHandler(e);
              }}
              placeholder="댓글을 작성하세요"
            ></textarea>
            <div className={styles.commentBtnContainer}>
              <button className={styles.commentBtn} onClick={btn}>
                댓글 작성
              </button>
            </div>
          </div>
        </article>

        <article>
          <div className={styles.secondCommentContainer}>
            <div className={styles.box}>
              <div className={styles.profile}>
                <img
                  className={styles.secondCommentImg}
                  src={comments.userImg}
                />
                <div className={styles.commentinfo}>
                  <div className={styles.commentusername}>
                    <span>{comments.username}</span>
                  </div>
                  <div className={styles.commentdate}>
                    <span>{comments.created_at}</span>
                  </div>
                </div>
              </div>
              {/* <div className={styles.action}>
              <span>수정</span>
              <span>삭제</span>
            </div> */}
            </div>
            <div className={styles.commentInfo}>
              <p>{comments.comment}</p>
            </div>
            <div className={styles.commentLine}></div>
          </div>
        </article>
      </div>
      {isModalShow && (
        <LogoutModal
          modalOff={modalOff}
          clearToken={clearToken}
          setLogout={setLogout}
          accessToken={accessToken}
        />
      )}
    </section>
  );
};

export default Detail;
