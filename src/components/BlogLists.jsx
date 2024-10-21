import { useEffect, useState } from "react";
import axios from "axios";

const BlogLists = () => {
  const [posts, setPost] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    axios.get("https://pmschemehub.in/wp-json/wp/v2/postsgit")
  })

  return (
    <>
      <section>
        <div>
          <div className="bg-white">
            <h2 className="text-3xl font-bold">This is the title of blog</h2>
            <div>
              <p>
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Porro
                suscipit perferendis dolor velit, odit laudantium cupiditate
                mollitia modi soluta, assumenda quam provident vero
                exercitationem id optio autem rem obcaecati sed.
              </p>
            </div>
            <div>
              <button
                type="button"
                className="border border-black px-3 rounded"
              >
                Read More
              </button>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogLists;
