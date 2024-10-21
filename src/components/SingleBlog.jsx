import { useParams } from "react-router-dom";
import CategoryList from "./CategoryList";
import LatestPost from "./LatestPost";
import { useEffect, useState } from "react";
import axios from "axios";

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
      <div className="w-3/12 px-2">
        <CategoryList />
      </div>
      <div className="w-3/12 px-2">
        {post && (
          <>
            <h1>{post.title.rendered}</h1>
            <div dangerouslySetInnerHTML={{ __html: post.content.rendered }} />
          </>
        )}
      </div>
      <div className="w-3/12 px-2">
        <LatestPost />
      </div>
    </section>
  );
};

export default SingleBlogPage;
