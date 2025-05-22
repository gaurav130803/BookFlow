import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AutoComplete, Input, message } from "antd";
import { UserOutlined, MenuOutlined, SearchOutlined } from "@ant-design/icons";
import axios from "axios";

function Navbar() {
  const [username, setUsername] = useState("");
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [menuOpen, setMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const storedUsername = localStorage.getItem("username");
    if (storedUsername) {
      const capitalized =
        storedUsername.charAt(0).toUpperCase() + storedUsername.slice(1);
      setUsername(capitalized);
    }
  }, []);

  const handleLogout = () => {
    localStorage.clear();
    setUsername("");
    navigate("/");
  };

  const handleSearch = async (value) => {
    setQuery(value);
    if (!value) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:5000/api/book/search?query=${value}`
      );
      if (res.data.success && res.data.books.length > 0) {
        const options = res.data.books.map((book) => ({
          value: book.name,
          label: book.name,
          bookId: book._id,
        }));

        setSuggestions(options);
      } else {
        setSuggestions([]);
      }
    } catch (err) {
      console.error("Search failed", err);
      message.error("Search failed.");
    }
  };

  const onSelect = (value, option) => {
    navigate(`/book/${option.bookId}`);
    setSearchOpen(false); // Close search dropdown on mobile after selecting
  };

  return (
    <nav className="w-[98%] bg-black h-16 mx-auto rounded-2xl mt-5 flex items-center justify-between px-6 z-50 relative">
      {/* Mobile Left: Menu */}
      <div className="md:hidden">
        <MenuOutlined
          onClick={() => setMenuOpen((prev) => !prev)}
          style={{ fontSize: "24px", color: "#60a5fa", cursor: "pointer" }}
          aria-label="Toggle menu"
        />
      </div>

      {/* Desktop Nav Links */}
      <ul className="hidden md:flex gap-12 items-center">
        <li className="text-white text-[1.4rem] hover:text-indigo-400">
          <Link to="/">Home</Link>
        </li>
        <li className="text-white text-[1.4rem] hover:text-indigo-400">
          <Link to="/genre">Genre</Link>
        </li>
        <li className="text-white text-[1.4rem] hover:text-indigo-400">
          <Link to="/favourites">Favourite</Link>
        </li>
        <li className="text-white text-[1.4rem] hover:text-indigo-400">
          <Link to="/contact">Contact</Link>
        </li>
      </ul>

      {/* Desktop Search + User */}
      <div className="hidden md:flex items-center gap-6">
        <AutoComplete
          style={{ width: 250 }}
          options={suggestions}
          onSearch={handleSearch}
          onSelect={onSelect}
          placeholder="Search books..."
          allowClear
          optionLabelProp="label"
        >
          <Input.Search enterButton />
        </AutoComplete>

        {username ? (
          <div className="relative group text-white text-[1.4rem] cursor-pointer flex items-center gap-2">
            <UserOutlined className="text-lg" />
            <span>{username}</span>
            <div
              onClick={handleLogout}
              className="absolute top-[120%] left-1/2 transform -translate-x-1/2 bg-black text-white px-4 py-1 rounded-md shadow-md opacity-0 group-hover:opacity-100 transition duration-300 text-sm"
            >
              Logout
            </div>
          </div>
        ) : (
          <Link
            to="/login"
            className="text-white text-[1.2rem] hover:text-indigo-400"
          >
            Login
          </Link>
        )}
      </div>

      {/* Mobile Right: Search Icon */}
      <div className="md:hidden">
        <SearchOutlined
          onClick={() => setSearchOpen((prev) => !prev)}
          style={{ fontSize: "24px", color: "#60a5fa", cursor: "pointer" }}
          aria-label="Toggle search"
        />
      </div>

      {/* Mobile Search Dropdown */}
      {searchOpen && (
        <div className="absolute top-full right-0 w-full bg-black p-4 z-40 md:hidden">
          <AutoComplete
            style={{ width: "100%" }}
            options={suggestions}
            onSearch={handleSearch}
            onSelect={onSelect}
            placeholder="Search books..."
            allowClear
            optionLabelProp="label"
          >
            <Input.Search enterButton />
          </AutoComplete>
        </div>
      )}

      {/* Mobile Menu Dropdown */}
      {menuOpen && (
        <div className="absolute top-full left-0 w-full bg-black p-4 z-40 md:hidden">
          <ul className="flex flex-col gap-4">
            <li className="text-white text-lg hover:text-indigo-400">
              <Link
                to="/"
                onClick={() => setMenuOpen(false)}
              >
                Home
              </Link>
            </li>
            <li className="text-white text-lg hover:text-indigo-400">
              <Link
                to="/genre"
                onClick={() => setMenuOpen(false)}
              >
                Genre
              </Link>
            </li>
            <li className="text-white text-lg hover:text-indigo-400">
              <Link
                to="/favourites"
                onClick={() => setMenuOpen(false)}
              >
                Favourite
              </Link>
            </li>
            <li className="text-white text-lg hover:text-indigo-400">
              <Link
                to="/contact"
                onClick={() => setMenuOpen(false)}
              >
                Contact
              </Link>
            </li>
            <li>
              {username ? (
                <button
                  onClick={() => {
                    handleLogout();
                    setMenuOpen(false);
                  }}
                  className="text-white !text-xl hover:text-indigo-400"
                >
                  Logout ({username})
                </button>
              ) : (
                <Link
                  to="/login"
                  onClick={() => setMenuOpen(false)}
                  className="text-white text-lg hover:text-indigo-400"
                >
                  Login
                </Link>
              )}
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
}

export default Navbar;
