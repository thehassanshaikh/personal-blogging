import { Route, Routes } from "react-router-dom";
import "./App.css";
import SingleBlogPage from "./components/SingleBlog";
import Home from "./components/Home";
import CategoryPage from "./components/CategoryPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/post/:id" element={<SingleBlogPage />} />
      <Route path="/category/:categoryId" element={<CategoryPage />} />
    </Routes>
  );
}

export default App;
