import React, { useEffect, useState } from "react";
import Login from "./Login";
import Logout from "./Logout";
import { useAuth } from "../context/AuthProvider";
import axios from "axios";

function Navbar() {
  const [authUser, setAuthUser] = useAuth();
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [sticky, setSticky] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const element = document.documentElement;

  useEffect(() => {
    if (theme === "dark") {
      element.classList.add("dark");
      localStorage.setItem("theme", "dark");
      document.body.classList.add("dark");
    } else {
      element.classList.remove("dark");
      localStorage.setItem("theme", "light");
      document.body.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const handleScroll = () => setSticky(window.scrollY > 0);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchQuery.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:4001/book/search?query=${encodeURIComponent(searchQuery)}`
      );
      setSearchResults(res.data);
    } catch (err) {
      console.error(err);
      setSearchResults([]);
    }
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    if (value.trim() === "") {
      setSearchResults([]);
    }
  };

  const navItems = (
    <>
      <li><a href="/">Home</a></li>
      <li><a href="/course">Course</a></li>
      <li><a href="/contact">Contact</a></li>
      <li><a href="/about">About</a></li>
    </>
  );

  return (
    <>
      <div
        className={`max-w-screen-2xl container mx-auto md:px-20 px-4 dark:bg-slate-800 dark:text-white fixed top-0 left-0 right-0 z-50 ${
          sticky ? "shadow-md bg-base-200 dark:bg-slate-700 transition" : ""
        }`}
      >
        <div className="navbar">
          <div className="navbar-start">
            <div className="dropdown">
              <label tabIndex={0} className="btn btn-ghost lg:hidden">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              </label>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 dark:bg-slate-800"
              >
                {navItems}
              </ul>
            </div>
            <a className="text-2xl font-bold cursor-pointer">bookStore</a>
          </div>

          <div className="navbar-center hidden lg:flex">
            <ul className="menu menu-horizontal px-1">{navItems}</ul>
          </div>

          <div className="navbar-end space-x-3">
            <form onSubmit={handleSearch} className="hidden md:flex">
              <input
                type="text"
                value={searchQuery}
                onChange={handleInputChange}
                className="px-4 py-2 rounded-md outline-none dark:bg-slate-900 dark:text-white border border-gray-300 focus:ring-2 focus:ring-blue-500"
                placeholder="Search books"
              />
              <button
                type="submit"
                className="ml-2 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-4 py-2 rounded-xl shadow-md hover:from-purple-700 hover:to-indigo-700 hover:scale-105 transition-all duration-300"
              >
                Search
              </button>
            </form>

            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded hover:bg-slate-300 dark:hover:bg-slate-700"
            >
              {theme === "dark" ? "🌙" : "☀️"}
            </button>

            {authUser ? (
              <Logout />
            ) : (
              <div>
                <a
                  className="bg-black text-white px-3 py-2 rounded-md hover:bg-slate-800 cursor-pointer"
                  onClick={() => document.getElementById("my_modal_3").showModal()}
                >
                  Login
                </a>
                <Login />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Results Display */}
      {searchQuery.trim() && (
        <div className="max-w-screen-2xl container mx-auto md:px-20 px-4 mt-24 mb-10">
          <h2 className="text-xl font-bold mb-4">Search Results:</h2>
          {searchResults.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {searchResults.map((book) => (
                <div
                  key={book._id}
                  className="p-4 border rounded shadow hover:shadow-lg dark:bg-slate-800"
                >
                  <h3 className="text-lg font-semibold">{book.title}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{book.name}</p>
                  <p className="text-sm mt-2">{book.category}</p>
                  <a
                    href={`http://localhost:4001${book.pdfUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-blue-500 hover:underline"
                  >
                    View PDF
                  </a>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500">No books found. Try searching something else!</p>
          )}
        </div>
      )}
    </>
  );
}

export default Navbar;
