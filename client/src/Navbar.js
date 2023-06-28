import logo from "../public/Friends-logo.png";
import { Link } from "react-router-dom";
import '../styles/navbar.css'
import { useContext, Fragment } from "react";
import UserContext from "../context/userContext";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();
  const { userStatus, updateUser } = useContext(UserContext);
  console.log(userStatus)
  const handleLogout = () => {
    localStorage.clear();
    updateUser("authenticated", false)
    navigate("/login")
  };

  const authenticated = (
    <Fragment>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="navbar-brand" to="/profilepage">
            / Profile /
          </Link>
        </li>
        <li className="nav-item">
          <Link className="navbar-brand" to="/userposts">
            Posts
          </Link>
        </li>
      </ul>
      <ul className="navbar-nav ml-auto">
        <li className="nav-item">
          <button className="navbar-brand logout" onClick={handleLogout}>
            Log Out
          </button>
        </li>
      </ul>
    </Fragment>
  )

  const guest = (
    <Fragment>
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="navbar-brand" to="/login">
            / Login /
          </Link>
        </li>
        <li className="nav-item">
          <Link className="navbar-brand" to='/register'>
            Register
          </Link>
        </li>
      </ul>
    </Fragment>
  )
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand" to="/">
          <img src={logo} width="100" height="50" alt="logo"></img>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavDropdown"
          aria-controls="navbarNavDropdown"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          {userStatus.authenticated ? authenticated : guest}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;