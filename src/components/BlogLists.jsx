import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogLists = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages state

  // Function to decode HTML entities
  const decodeEntities = (html) => {
    const txt = document.createElement("textarea");
    txt.innerHTML = html;
    return txt.value;
  };

  useEffect(() => {
    // Fetch data from the WordPress REST API
    axios
      .get(
        `https://pmschemehub.in/wp-json/wp/v2/posts?per_page=10&page=${page}`
      )
      .then((response) => {
        setPosts(response.data);
        setTotalPages(parseInt(response.headers["x-wp-totalpages"])); // Total pages from headers
        console.log(posts);
        setLoading(false); // Set loading to false after data is fetched
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
        setLoading(false);
      });
  }, [page]);

  const handlePageClick = (pageNumber) => {
    setPage(pageNumber);
  };

  if (loading) {
    return <p>Post are Loading...</p>;
  }

  return (
    <>
      <section>
        {loading ? (
          <p>Post loading...</p>
        ) : (
          <div>
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-white p-5 mb-4 rounded-lg shadow-md"
              >
                <Link to={`/post/${post.slug}`}>
                  <h2 className="text-2xl font-bold text-neutral-900 hover:text-blue-600">
                    {post.title.rendered}
                  </h2>
                </Link>
                <div>
                  <p className="text-neutral-900 py-2 ">
                    {decodeEntities(
                      post.excerpt.rendered.replace(/<[^>]*>/g, "")
                    )}
                  </p>
                </div>
                <div className="py-2">
                  <Link
                    className="border border-blue-600 py-1 px-2 rounded text-blue-600 hover:bg-blue-600 hover:text-white"
                    to={`/post/${post.slug}`}
                  >
                    Read More
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        {/* Pagination controls */}
        <div className="pagination">
          {totalPages > 1 &&
            Array.from({ length: totalPages }, (_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageClick(index + 1)}
                className={`px-2 py-1 m-1 rounded ${
                  page === index + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                }`}
              >
                {index + 1}
              </button>
            ))}
        </div>
      </section>
    </>
  );
};

export default BlogLists;
