import "./styles/login.css";
import NavBar from "./Navbar";
import { fetchData } from "../main";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import UserContext from "../context/userContext.js";

const Login = () => {
  const [errorNotify , setErrorNotify] = useState({
    message : ''
  })
  const navigate = useNavigate();
  const {userStatus, updateUser} = useContext(UserContext);
  console.log(userStatus)
  const [user, setUser] = useState({
    username: '',
    password: '',
  });

  const {username, password} = user;  

  const onChange = (e) => setUser({...user, [e.target.name]: e.target.value})

  const onSubmit = (e) => {
    e.preventDefault();

    fetchData("/user/login", 
      {
       username,
       password
      }, 
      "POST")
    .then((data) => {
      if(!data.message) {
        console.log(data._doc.username)
        localStorage.setItem('userid', data._doc._id)
        localStorage.setItem('username', data._doc.username)
        //updateUser("username", data._doc.username)
        //updateUser("userid", data._doc._id)
        updateUser("authenticated", true)
        console.log(userStatus)
        navigate("/profilepage")
      }
    })  
    .catch((error) => {
      console.log(error)
      setErrorNotify({
        message : "Invalid Credentials"
      })
    })

  }

  return (
    <div>
      <NavBar />
      <div className="errorNotify">{errorNotify.message}</div>
      <form onSubmit={onSubmit}>
      <div className="nyBgImage">
        <div className="login">
          <div className="form">
            <h2>Welcome, Login into F.R.I.E.N.D.S</h2>
            <input type="text" placeholder="Username" name='username'
            onChange={onChange}
            value={username}/>
            <input type="password" placeholder="Password" id="password"
            name='password'
            onChange={onChange}
            value={password}
            required />
            <input type="submit" value="Sign In" className="submit" />
          </div>
        </div>
      </div>
      </form>
    </div>
  );
};

export default Login;