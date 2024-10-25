import { Route, Routes } from "react-router-dom";
import "./App.css";
import SingleBlogPage from "./components/SingleBlog";
import Home from "./components/Home";
import CategoryPage from "./components/CategoryPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/post/:slug" element={<SingleBlogPage />} />
        <Route path="/category/:categorySlug" element={<CategoryPage />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
