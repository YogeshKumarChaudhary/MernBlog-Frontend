import React, { useState } from "react";
import "../../styles/Form.css";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useUserContext } from "../../UserContext";
import toast from "react-hot-toast";

const Login = () => {
  const { userInfo, setUserInfo } = useUserContext();
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const handlChange = (e) => {
    const { name, value } = e.target;
    setInput((pre) => ({
      ...pre,
      [name]: value,
    }));
    // console.log(input);
  };
  const handlSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://mernblog-backend-0sxq.onrender.com/api/login",
        input
      );
      // console.log(res.data);
      setUserInfo(res.data);
      toast.success("Login successfully");
    } catch (error) {
      // console.log(error);
      if (error.status !== 200) {
        toast.error("Enter Valid Username and Password!");
        // alert("Wrong Credencials!");
      }
    }
  };
  return (
    <>
      {userInfo && <Navigate to="/" />}
      <form className="form" onSubmit={handlSubmit}>
        <h1 className="heading">Login</h1>
        <div>
          <label htmlFor="username">UserName : </label>
          <input
            type="text"
            name="username"
            value={input.username}
            onChange={handlChange}
            id="username"
            placeholder="Enter Your Name"
          />
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <input
            type="password"
            name="password"
            value={input.password}
            onChange={handlChange}
            id="password"
            placeholder="Enter Your Password"
          />
        </div>
        <button>Login</button>
      </form>
    </>
  );
};

export default Login;
