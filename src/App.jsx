import "./App.css";
import BlogList from "./components/BlogLists";
import CategoryList from "./components/CategoryList";
import LatestPost from "./components/LatestPost";

function App() {
  return (
    <>
      <section className="w-full flex justify-center">
        <div className="w-3/12 px-2">
          <CategoryList />
        </div>
        <div className="w-3/12 px-2">
          <BlogList />
        </div>
        <div className="w-3/12 px-2">
          <LatestPost />
        </div>
      </section>
    </>
  );
}

export default App;
