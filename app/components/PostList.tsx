// components/PostList.js
import React from "react";

const PostList = ({ posts }) => {
  return (
    <div>
      <h2>Post List</h2>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.slider_media_url}</li>
        ))}
      </ul>
    </div>
  );
};

export default PostList;
