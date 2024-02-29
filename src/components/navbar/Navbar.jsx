import React, { useEffect, useState } from "react";
import "./Navbar.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { useUserContext } from "../../UserContext";

const Navbar = () => {
  const { userInfo, setUserInfo } = useUserContext();
  // console.log(userInfo);
  useEffect(() => {
    const fetchuser = async () => {
      const res = await axios.get("http://localhost:5000/api/profile", {
        withCredentials: true,
      });
      // console.log(res.data.username);
      setUserInfo(res?.data);
    };
    fetchuser();
  }, []);
  const logout = async () => {
    const res = await axios.post("http://localhost:5000/api/logout", {
      withCredentials: true,
    });
    // console.log(res);
    setUserInfo(null);
  };
  return (
    <header className="navbar-container">
      <Link to="/" className="logo">
        MyBlog
      </Link>
      <nav>
        {userInfo && userInfo ? (
          <>
            <span>Hello, {userInfo.username}</span>
            <Link to="/create">Create new post</Link>
            <p onClick={logout}>Logout</p>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
          </>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
