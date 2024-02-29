import axios from "axios";
import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import Editor from "../components/Editor";
import { useUserContext } from "../UserContext";
import toast from "react-hot-toast";

const CreateBlogPage = () => {
  const { userInfo } = useUserContext();
  // console.log(userInfo);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);

  const handlSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    // console.log(file[0]);
    data.set("file", file[0]);
    data.set("content", content);
    data.set("id", userInfo?.id);

    const res = await axios.post(
      "https://mernblog-backend-0sxq.onrender.com/api/post",
      data
    );
    // console.log(res);
    if (res.status === 200) {
      toast.success("Post Created successfully");
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <form className="form" onSubmit={handlSubmit}>
      <h1 className="heading">Create new blog</h1>
      <div>
        <label htmlFor="title">Title : </label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          id="title"
          placeholder="Enter Title"
        />
      </div>
      <div>
        <label htmlFor="summary">Summary : </label>
        <input
          type="text"
          name="summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          id="summary"
          placeholder="Enter Summary"
        />
      </div>
      <div>
        <label htmlFor="file">Img : </label>
        <input
          type="file"
          name="file"
          onChange={(e) => setFile(e.target.files)}
          id="file"
          placeholder="Upload File"
        />
      </div>
      <div>
        <label htmlFor="content">Content : </label>
        <Editor value={content} onChange={(e) => setContent(e)} />
      </div>
      <button>Create Blog</button>
    </form>
  );
};

export default CreateBlogPage;
