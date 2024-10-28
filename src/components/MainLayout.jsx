// MainLayout.js
import CategoryList from "./CategoryList";
import LatestPost from "./LatestPost";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <section className="w-full flex justify-center">
      <div className="lg:w-2/12 md:w-3/12 px-2 hidden md:block">
        <CategoryList />
      </div>
      <div className="w-full md:w-6/12 px-2">
        {/* Outlet will render the main content of each route here */}
        <Outlet />
      </div>
      <div className="lg:w-2/12 md:w-3/12 px-2 hidden md:block">
        <LatestPost />
      </div>
    </section>
  );
};

export default MainLayout;
