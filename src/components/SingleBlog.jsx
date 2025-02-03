import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import "../style.css"; // Import the external CSS file

const SingleBlogPage = () => {
  const { slug } = useParams(); // Use slug instead of id
  const [post, setPost] = useState(null); // Corrected setPost (singular)
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    axios
      .get(`/api/wp-json/wp/v2/posts?slug=${slug}`) // Fetch post using slug
      .then((response) => {
        if (response.data.length > 0) {
          setPost(response.data[0]); // Set the first post found
        } else {
          setError("Post not found."); // Handle case when no post is found
        }
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error Fetching Post", error);
        setError("An error occurred while fetching the post."); // Set error message
        setLoading(false);
      });
  }, [slug]);

  if (loading) {
    return <p>Loading Post ...</p>;
  }

  if (error) {
    return <p>{error}</p>; // Display error message if there's an error
  }

  return (
    <div className="w-full p-5 bg-white rounded-lg">
      {post && (
        <>
          <h1 className="text-2xl font-bold text-neutral-900">
            {post.title.rendered}
          </h1>
          <div className="post-content">
            <p
              className="text-neutral-700 "
              dangerouslySetInnerHTML={{ __html: post.content.rendered }}
            ></p>
          </div>
        </>
      )}
    </div>
  );
};

export default SingleBlogPage;
