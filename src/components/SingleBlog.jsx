import { useParams } from "react-router-dom";
import CategoryList from "./CategoryList";
import LatestPost from "./LatestPost";
import { useEffect, useState } from "react";
import axios from "axios";
import "../style.css"; // Import the external CSS file

const SingleBlogPage = () => {
  const { id } = useParams(); // Destructure id correctly
  const [post, setPost] = useState(null); // Corrected setPost (singular)
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get(`https://pmschemehub.in/wp-json/wp/v2/posts/${id}`) // Use the id for fetching the post
      .then((response) => {
        setPost(response.data); // Correctly setPost
        setLoading(false);
      })
      .catch((error) => {
        console.log("Error Fetching Post", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <p>Loading Post ...</p>;
  }

  return (
    <section className="w-full flex justify-center">
      <div className="w-2/12 px-2">
        <CategoryList />
      </div>
      <div className="w-5/12 p-5 bg-white ">
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
      <div className="w-2/12 px-2">
        <LatestPost />
      </div>
    </section>
  );
};

export default SingleBlogPage;
