import React, { useEffect } from 'react'
import { Link, useNavigate } from "react-router-dom";
import Search from './product/Search';
import { useDispatch, useSelector } from "react-redux";
import { logout } from '../actions/userAction';
import { useAlert } from "react-alert";
import Badge from '@mui/material/Badge';
import Carticon from "./carticon.png";
import Cart from './cart/Cart';

const Header = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { cartItems } = useSelector((state) => state.cart);
  let dispatch = useDispatch();
  let navigate = useNavigate();
  const alert = useAlert();

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
    alert.show("logged out succesfully");
  }
  const handleLogin = (e) => {
    e.preventDefault();
    navigate('/login')
  }
  const handlesignup = (e) => {
    e.preventDefault();
    navigate('/signup')
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="#">Shopping App</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link" aria-current="page" to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/products">Products</Link>
              </li>
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dashboard
                </Link>
                <ul className="dropdown-menu">
                  <li><Link className='dropdown-item' to="/login">login</Link></li>
                  <li><Link className="dropdown-item" to="/signup">SignUp</Link></li>
                  <li><Link className="dropdown-item" to="/my-profile">Profile</Link></li>
                </ul>
              </li>
            </ul>
            {/* {
              isAuthenticated ?
              <button type="button" class="btn btn-primary mx-2" onClick={()=>dispatch(logout())} >Logout</button>
              :  <Link type="button" class="btn btn-primary mx-2" to="/login">Login</Link>
            } */}
            <Link to="/cart">
              <Badge badgeContent={cartItems.length} color="primary">
                <img src={Carticon} className="mx-1 my-1" style={{ fontSize: 25, cursor: "pointer" }} />
              </Badge></Link>


            <form>
              <button className="btn btn-primary btn-sm mx-1" disabled={isAuthenticated ? true : false} onClick={handleLogin}>login</button>
              <button className="btn btn-primary btn-sm mx-1" disabled={isAuthenticated ? true : false} onClick={handlesignup}>signup</button>
              <button className="btn btn-primary btn-sm mx-1" disabled={isAuthenticated ? false : true} onClick={handleLogout}>log out</button>
            </form>


            <Search />
          </div>
        </div>
      </nav>
    </>
  )
};

export default Header