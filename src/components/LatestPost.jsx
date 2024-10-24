import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const LatestPost = () => {
  const [latestPosts, setLatestPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://pmschemehub.in/wp-json/wp/v2/posts?per_page=5")
      .then((response) => {
        setLatestPosts(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error Fetching Latest Post", error); // Fixed error logging
        setLoading(false);
      });
  }, []); // Added dependency array

  if (loading) {
    return <p>Latest Post Loading...</p>;
  }

  return (
    <aside className="sidebar bg-white p-5 mb-4 rounded-lg shadow-md">
      <h2 className="text-xl font-bold text-neutral-900 pb-2">Latest Posts</h2>
      <ul>
        {latestPosts.map((post) => (
          <li
            key={post.id}
            className="text-neuteal-900 hover:underline hover:text-blue-600 mb-2"
          >
            <Link to={`/post/${post.slug}`}>{post.title.rendered}</Link>
          </li>
        ))}{" "}
        {/* Added parentheses to return JSX */}
      </ul>
    </aside>
  );
};

export default LatestPost;
