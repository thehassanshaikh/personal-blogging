import { useEffect, useState } from "react";
import CategoryList from "./CategoryList";
import LatestPost from "./LatestPost";
import axios from "axios";
import { useParams, Link } from "react-router-dom";

const CategoryPage = () => {
  const { categorySlug } = useParams(); // Get categorySlug from URL params
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1); // Current page number
  const [totalPages, setTotalPages] = useState(1); // Total number of pages
  const [categoryId, setCategoryId] = useState(null); // Store categoryId once fetched

  useEffect(() => {
    console.log("Fetching category for slug:", categorySlug); // Log slug
    // Fetch category by slug to get the category ID
    axios
      .get(
        `https://pmschemehub.in/wp-json/wp/v2/categories?slug=${categorySlug}`
      )
      .then((response) => {
        console.log("Category response:", response.data); // Log response data
        if (response.data.length > 0) {
          const category = response.data[0];
          setCategoryId(category.id); // Set categoryId after fetching the category
          return axios.get(
            `https://pmschemehub.in/wp-json/wp/v2/posts?categories=${category.id}&page=${page}&per_page=10`
          );
        } else {
          console.error("No category found with the provided slug.");
          throw new Error("Category not found");
        }
      })
      .then((response) => {
        setPosts(response.data);
        setTotalPages(parseInt(response.headers["x-wp-totalpages"], 10)); // Get total pages from response headers
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error Fetching Category:", error);
        setLoading(false);
      });
  }, [categorySlug, page]); // Refetch when categorySlug or page changes

  const handlePageClick = (newPage) => {
    setPage(newPage); // Update the current page
  };

  if (loading) {
    return <p>Loading posts...</p>;
  }

  if (posts.length === 0) {
    return <p>No posts available for this category.</p>;
  }

  const decodeEntities = (input) => {
    const doc = new DOMParser().parseFromString(input, "text/html");
    return doc.documentElement.textContent;
  };

  return (
    <section className="w-full flex justify-center">
      <div className="w-2/12 px-2">
        <CategoryList />
      </div>
      <div className="w-5/12 px-2 min-h-screen">
        <div>
          {posts.map((post) => (
            <div
              key={post.id}
              className="bg-white p-5 mb-4 rounded-lg shadow-md"
            >
              {/* Use post slug instead of post ID */}
              <Link to={`/post/${post.slug}`}>
                <h2 className="text-2xl font-bold text-neutral-900 hover:text-blue-600">
                  {post.title.rendered}
                </h2>
              </Link>
              <div>
                <p className="text-neutral-900 py-2">
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

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination flex justify-center mt-4">
            {Array.from({ length: totalPages }, (_, index) => (
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
        )}
      </div>
      <div className="w-2/12 px-2">
        <LatestPost />
      </div>
    </section>
  );
};

export default CategoryPage;
