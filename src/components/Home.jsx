import CategoryList from "./CategoryList";
import LatestPost from "./LatestPost";
import BlogLists from "./BlogLists";

const Home = () => {
  return (
    <section className="w-full flex justify-center">
      <div className="w-3/12 px-2">
        <CategoryList />
      </div>
      <div className="w-3/12 px-2">
        <BlogLists />
      </div>
      <div className="w-3/12 px-2">
        <LatestPost />
      </div>
    </section>
  );
};

export default Home;
