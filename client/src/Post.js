import { fetchData } from "../main";
import { useState, useEffect } from "react";
import NavBar from "./Navbar";
import "../styles/posts.css";
import userLogo from "../public/howudoin.png";
import postsBg from "../public/friends.jpg";

const Posts = () => {
  const username = localStorage.getItem("username");
  const userId = localStorage.getItem("userid");

  const [posts, setPost] = useState([]);

  const [functionCount, setFunctionCount] = useState(0);

  useEffect(() => {
    if (functionCount === 0) {
      fetch();
    }
  });

  const fetch = () => {
    fetchData(
      "/post/getPost",
      {
        userId,
      },
      "POST"
    )
      .then((data) => {
        if (!data.message) {
          console.log(data);
          var postArray = [];
          for (var i in data) postArray.push([i, data[i]]);
          setPost(postArray);
        }
      })
      .catch((error) => {
        console.log(error);
      });
    setFunctionCount(functionCount + 1);
  };
  console.log(posts);
  const deletePost = (e) => {
    var id = e.target.id;
    fetchData(
      "/post/delete",
      {
        id
      },
      "DELETE"
    )
      .then((data) => {
        if (!data.message) {
          console.log(data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
      setFunctionCount(functionCount - 1);
    }
  return (
    <div>
      <NavBar />
      <div className="postsBG">
        <img src={postsBg} alt="BG"></img>
      </div>
      <div className="postBGcolor">
        <div className="postCards ">
          {posts.map((item, i) => {
            return (
              <div className="card" key={i}>
                <div className="card-header">
                  <div className="profile">
                    <img src={userLogo} className="userLogo" alt="logo" />
                  </div>
                  <div className="card-title-group">
                    <h5 className="card-title">{username}</h5>
                  </div>
                  <div className="card-title-group">
                  <button id={item[1]._id} className="deleteButton" onClick={deletePost}>Delete</button>
                  </div>
                </div>

                <div>
                  <div className="card-post-bar">
                    <div className="post-title">
                      <strong>{item[1].post_title}</strong>
                    </div>
                  </div>
                  <div className="card-post-bar">
                    <div className="post-description">
                      {item[1].post_content}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Posts;