// hooks/usePosts.js
import { useState, useEffect } from "react";

function usePosts() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    // Fetch data from your API here
    fetch("http://localhost:8086/sliders")
      .then((response) => response.json())
      .then((data) => setPosts(data));
  }, []);

  return { posts };
}

export default usePosts;
