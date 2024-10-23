import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("https://pmschemehub.in/wp-json/wp/v2/categories")
      .then((response) => {
        setCategories(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error Fetching Categories", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Categories is Loading...</p>;
  }
  return (
    <>
      <aside className="sidebar bg-white p-5 mb-4 rounded-lg shadow-md">
        <h2 className="text-xl font-bold text-neutral-900 pb-2">Categories</h2>
        <ul>
          {categories.map((category) => (
            <li key={category.id} className="mb-2">
              <Link
                to={`/category/${category.slug}`}
                className="text-neuteal-900 hover:underline hover:text-blue-600"
              >
                {category.name} ({category.count})
              </Link>
            </li>
          ))}
        </ul>
      </aside>
    </>
  );
};

export default CategoryList;
