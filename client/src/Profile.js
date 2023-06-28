import NavBar from "./Navbar";
import { fetchData } from "../main";
import { useState } from "react";
import "./styles/profilepage.css";
import userLogo from "../public/howudoin.png"

const Profile = () => {
    const username = localStorage.getItem("username");
    const userid = localStorage.getItem("userid");
    const [success , setSuccess] = useState({
      message : ''
    })
    const [post, setPost] = useState({
      postTitle: '',
      postContent: '',
      userId: userid
    });
  
    const {postTitle, postContent, userId} = post;  
  
    const onChange = (e) => setPost({...post, [e.target.name]: e.target.value})
    const placeholderString = "What's on your mind, " + username + "?";

    const onSubmit = (e) => {
      e.preventDefault();
  
      fetchData("/post/create", 
        {
          postTitle,
          postContent,
          userId
        }, 
        "POST")
      .then((data) => {
        if(!data.message) {
          console.log(data)
          setSuccess({
            message : "Post Succesfully Created"
          })
        }
      })  
      .catch((error) => {
        console.log(error)
      })
  
    }
  
  return (
    <div>
      <NavBar />
      <h1 className="myFont text--center profileInfo">Welcome {username}</h1>
      <div className="container">
        <div className="wrapper">
          <section className="post">
            <header>Create Post</header>
            <form onSubmit={onSubmit}>
              <div className="content">
                <img src={userLogo} alt="logo" />
                <div className="details">
                  <p>{username}</p>            
                </div>
              </div>
              Title of the Post : <input type="text" className="postTitleinput" name="postTitle" onChange={onChange}
            value={postTitle} required/>
              <textarea
                placeholder={placeholderString}
                onChange={onChange}
                name="postContent"
                value={postContent}
                spellCheck="false"
                required
              ></textarea>
              <button>Post</button>
            </form>
          </section>
        </div>
      </div>
      <div className="myFont text--center profileInfo">{success.message}</div>
    </div>
  );
};

export default Profile;