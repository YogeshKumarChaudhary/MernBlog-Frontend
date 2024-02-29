import React, { useState } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
  const [redirect, setRedirect] = useState(false);
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
  };
  // console.log(input);
  const handlSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "https://mernblog-backend-0sxq.onrender.com/api/register",
        input
      );
      // console.log(res);
      if (res?.status === 201) {
        res?.status && <Navigate to="/" />;
        toast.success("Registration successfully");
        setInput({
          username: "",
          password: "",
        });
        setRedirect(true);
      }
    } catch (error) {
      // console.log(error);
      if (error.status !== 201) {
        toast.error("Enter Valid Username and Password!");
      }
    }
  };

  if (redirect) {
    return <Navigate to="/login" />;
  }
  return (
    <form className="form" onSubmit={handlSubmit}>
      <h1 className="heading">Register</h1>
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
      <button type="submit">Register</button>
    </form>
  );
};

export default Register;
