import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogLists = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch data from the WordPress REST API
    axios
      .get("https://pmschemehub.in/wp-json/wp/v2/posts")
      .then((response) => {
        setPosts(response.data);
        console.log(posts);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Post are Loading...</p>;
  }
  return (
    <>
      <section>
        <div>
          {posts.map((post) => (
            <div key={post.id} className="bg-white p-5 mb-4 rounded-lg">
              <h2 className="text-2xl font-bold text-neutral-900">
                {post.title.rendered}
              </h2>
              <div className="py-2">
                <p className="text-neutral-900">
                  {post.excerpt.rendered.replace(/<[^>]*>/g, "")}
                </p>
              </div>
              <div>
                <Link
                  className="border border-black px-3 rounded"
                  to={`/post/${post.id}`}
                >
                  Read More
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default BlogLists;
