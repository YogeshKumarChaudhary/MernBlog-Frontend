import axios from "axios";
import React, { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";
import Editor from "../components/Editor";

const EditBlogPage = () => {
  const { id } = useParams();
  // console.log(id);
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [file, setFile] = useState("");
  const [content, setContent] = useState("");
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    const getPostDetails = async () => {
      const res = await axios.get(`http://localhost:5000/api/post/${id}`);
      // console.log(res);
      if (res.status === 200) {
        setTitle(res?.data?.title);
        setSummary(res?.data?.summary);
        setContent(res?.data?.content);
      }
    };
    getPostDetails();
  }, []);

  const updateBlog = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.set("title", title);
    data.set("summary", summary);
    data.set("content", content);
    data.set("id", id);
    if (file?.[0]) {
      data.set("file", file?.[0]);
    }

    const res = await axios.put("http://localhost:5000/api/post", data, {
      withCredentials: true,
    });
    console.log(res);
    if (res.status === 200) {
      setRedirect(true);
    }
  };

  if (redirect) {
    return <Navigate to={`/post/${id}`} />;
  }
  return (
    <form className="form" onSubmit={updateBlog}>
      <h1 className="heading">Update blog</h1>
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
      <button>Update Blog</button>
    </form>
  );
};

export default EditBlogPage;
