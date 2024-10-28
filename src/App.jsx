import { Route, Routes } from "react-router-dom";
import "./App.css";
import SingleBlogPage from "./components/SingleBlog";
import Home from "./components/Home";
import CategoryPage from "./components/CategoryPage";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import MainLayout from "./components/MainLayout"; // Import MainLayout

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        {/* Use MainLayout as a wrapper for routes that need the sidebar */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/post/:slug" element={<SingleBlogPage />} />
          <Route path="/category/:categorySlug" element={<CategoryPage />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
