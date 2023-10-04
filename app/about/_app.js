// pages/_app.js
import React from "react";
import usePosts from "../hooks/usePosts";

function MyApp({ Component, pageProps }) {
  const { posts } = usePosts();

  return (
    <div>
      {/* You can pass the posts data as a prop to your pages */}
      <Component {...pageProps} posts={posts} />
    </div>
  );
}

export default MyApp;
