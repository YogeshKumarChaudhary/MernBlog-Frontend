import React, { useEffect, useState } from "react";
import Blog from "../components/blog/Blog";
import axios from "axios";

const HomePage = () => {
  const [post, setPost] = useState([]);
  useEffect(() => {
    const fetchAllPost = async () => {
      const res = await axios.get("https://mernblog-backend-0sxq.onrender.com/api/post");
      console.log(res);
      setPost(res.data);
    };
    fetchAllPost();
  }, []);

  // const blogData = [
  //   {
  //     url: "https://techcrunch.com/wp-content/uploads/2024/02/GettyImages-1318237749.jpg?w=1390&crop=1",
  //     title: "Antlers founder on its vertical AI bet in Southeast Asia",
  //     discription:
  //       "A growing roster of vertical AI startups is emerging in Southeast Asia to serve sectors ranging from seafood to finance.",
  //   },

  //   {
  //     url: "https://techcrunch.com/wp-content/uploads/2019/02/tik-tok-ios-icon.jpg?w=1390&crop=1",
  //     title: "Reesa Teesas ‘Who TF did I marry? TikToks are like an audiobook",
  //     discription:
  //       "TikToks latest viral superstar is Reesa Teesa, a Georgia woman who posted 50 videos — just under 10 minutes long apiece — chronicling her tumultuous.",
  //   },
  //   {
  //     url: "https://techcrunch.com/wp-content/uploads/2024/02/samsung-galaxy-ai.jpg?w=1390&crop=1",
  //     title: "Samsung is bringing Galaxy AI features to more devices",
  //     discription:
  //       "Samsung is bringing its Galaxy AI features to more devices through a new One UL 6.1 update coming in late March, the company announced today.",
  //   },
  // ];

  // const [blogs, setBlogs] = useState(blogData);
  return (
    <main>
      {post.map((blog, index) => (
        <Blog key={index} data={blog} />
      ))}
    </main>
  );
};

export default HomePage;
