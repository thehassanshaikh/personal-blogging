import CategoryList from "./CategoryList";
import LatestPost from "./LatestPost";

const SingleBlogPage = () => {
  return (
    <section className="w-full flex justify-center">
      <div className="w-3/12 px-2">
        <CategoryList />
      </div>
      <div className="w-3/12 px-2">
        <h1>Single Blog page list</h1>
      </div>
      <div className="w-3/12 px-2">
        <LatestPost />
      </div>
    </section>
  );
};

export default SingleBlogPage;
