import "./styles/register.css";
import NavBar from "./Navbar";
import { fetchData } from "../main";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const navigate = useNavigate();

  const [user, setUser] = useState({
    username: '',
    password: '',
    password2: ''
  });

  const {username, password, password2} = user;  

  const onChange = (e) => setUser({...user, [e.target.name]: e.target.value})

  const onSubmit = (e) => {
    e.preventDefault();

    fetchData("/user/register", 
      {
       username,
       password
      }, 
      "POST")
    .then((data) => {
      if(!data.message) {
        console.log(data)
        navigate("/login")
      }
    })  
    .catch((error) => {
      console.log(error)
    })

  }
  return (
    <div>
      <NavBar />
      <form onSubmit={onSubmit}>
      <div className="nyBgImage">
        <div className="register">
          <div className="form">
            <h2>Register and be a part of F.R.I.E.N.D.S</h2>
            <input type="text" placeholder="Username" id="username"
            name='username'
            onChange={onChange}
            value={username}
            required/>
            <input type="password" placeholder="Password" id="password"
            name='password'
            onChange={onChange}
            value={password}
            required/>
            <input type="password" placeholder="Confirm Password" id="password2"
            name='password2'
            onChange={onChange}
            value={password2}
            required/>
            <input type="submit" value="Sign UP" className="submit" />
          </div>
        </div>
      </div>
      </form>
    </div>
  );
};

export default Register;