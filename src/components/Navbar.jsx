import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <nav className="bg-white mb-4 shadow-sm sticky top-0">
      <div className="flex m-auto justify-between w-9/12 p-2">
        <div>
          <Link to="/">
            <img
              className="w-10 h-10"
              src="https://cdn.pixabay.com/photo/2022/01/16/16/44/blogger-logo-6942640_1280.png"
              alt=""
            />
          </Link>
        </div>
        <div className="w-8/12 m-auto">
          <input
            type="email"
            id="email"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-1.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            placeholder="Search"
            required
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
