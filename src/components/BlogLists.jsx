import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const BlogLists = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Current page state
  const [totalPages, setTotalPages] = useState(1); // Total pages state

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
        )}
        {/* Pagination controls */}
        <div className="pagination">
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index + 1}
              onClick={() => handlePageClick(index + 1)}
              className={
                page === index + 1
                  ? "active bg-blue-300 p-2 m-2 rounded"
                  : "p-2 border-blue-500 bg-white m-2"
              }
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
