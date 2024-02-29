import React from "react";
import "./Blog.css";
import { Link } from "react-router-dom";

const Blog = ({ data }) => {
  return (
    <section className="blog-container">
      <div className="image">
        <Link to={`/post/${data._id}`}>
          <img src={`http://localhost:5000/` + data.cover} alt={data.title} />
        </Link>
      </div>
      <div className="content">
        <Link to={`/post/${data._id}`}>
          <h2>{data.title}</h2>
        </Link>
        <div className="info">
          <p>{data.author.username}</p>
          <time>{data.createdAt.slice(0, 10)}</time>
        </div>
        <p className="discription">{data.summary.slice(0,140)+"..."}</p>
      </div>
    </section>
  );
};

export default Blog;