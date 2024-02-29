import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, Navigate, useParams } from "react-router-dom";
import "../styles/PostDetails.css";
import { useUserContext } from "../UserContext";

const PostDetailsPage = () => {
  const { userInfo } = useUserContext();
  const [postDetail, setPostDetail] = useState([]);
  const [redirect, setRedirect] = useState(false);
  const { id } = useParams();
  // console.log(id);
  useEffect(() => {
    const fetchPostDetails = async () => {
      const res = await axios.get(
        `https://mernblog-backend-0sxq.onrender.com/api/post/${id}`
      );
      // console.log(res);
      setPostDetail(res.data);
    };
    fetchPostDetails();
  }, []);

  const handlDelete = async () => {
    const res = await axios.delete(
      `https://mernblog-backend-0sxq.onrender.com/api/post/${id}`
    );
    // console.log("post Deleted ", res);
    if (res.status === 200) {
      setRedirect(true);
      toast.success("Post Deleted successfully");
    }
  };

  if (redirect) {
    return <Navigate to="/" />;
  }
  return (
    <div className="postDetails">
      <h2>{postDetail.title}</h2>
      <div className="post-author">
        <p>{postDetail?.createdAt?.slice(0, 10)}</p>
        <h4>by {postDetail?.author?.username}</h4>
        {userInfo && userInfo.id === postDetail?.author?._id && (
          <div className="editOptions">
            <div className="editBtn">
              <Link to={`/edit/${postDetail?._id}`}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-6 h-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                  />
                </svg>
                Edit this post
              </Link>
            </div>
            <button onClick={handlDelete} className="deletBtn">
              Delete
            </button>
          </div>
        )}
      </div>
      <div className="image">
        <img
          src={`https://mernblog-backend-0sxq.onrender.com/${postDetail.cover}`}
          alt={postDetail.title}
        />
      </div>
      <div
        className="content"
        dangerouslySetInnerHTML={{ __html: postDetail.content }}
      />
    </div>
  );
};

export default PostDetailsPage;
