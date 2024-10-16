import "./App.css";
import BlogList from "./components/BlogLists";
import CategoryList from "./components/CategoryList";
import LatestPost from "./components/LatestPost";

function App() {
  return (
    <>
      <section className="w-full flex px-20">
        <div className="w-2/6">
          <CategoryList />
        </div>
        <div className="w-2/6">
          <BlogList />
        </div>
        <div className="w-2/6">
          <LatestPost />
        </div>
      </section>
    </>
  );
}

export default App;
