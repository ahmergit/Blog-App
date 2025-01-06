import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaXmark, FaBars } from "react-icons/fa6";
import { signout } from "../../api/internal";
import { resetUser } from "../../store/userSlice";
import { useDispatch } from "react-redux";

function Navbar() {

  const dispatch = useDispatch();

  const isAuthenticated = useSelector((state) => state.user.auth);

  const handleSignout = async () => {
    await signout();
    dispatch(resetUser());
  }

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSticky, setIsSticky] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  // set toggle Menu
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const closeMobileMenu = () => {
    setIsMenuOpen(false);
  }

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("resize", handleResize);
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const navItems = [
    { link: "Home", path: "/" },
    { link: "Cryptocurrencies", path: "/crypto" },
    { link: "Blogs", path: "/blogs" },
    { link: "Submit a blogs", path: "/submit" },
  ];

  return (
    <>
      <header className="bg-black text-white fixed top-0 left-0 right-0">
        <nav
          className={`px-4 py-4 max-w-7xl justify-between items-center mx-auto ${
            isSticky ? "sticky top-0 left-0 right-0 duration-300" : ""
          }`}
        >
          <div className="flex justify-between items-center text-base gap-8">
            <NavLink to="/" onClick={closeMobileMenu} className="text-xl font-bold text-white">
              Crypto-Blogs
            </NavLink>

            {/* nav items for large devices */}

            <ul className="md:flex gap-12 text-lg hidden">
              {navItems.map(({ link, path }) => (
                <NavLink to={path} key={path} className="hover:text-blue-600">
                  {link}
                </NavLink>
              ))}
            </ul>

            {isAuthenticated ? (
              <div className="space-x-2 flex ml-9 items-center" onClick={handleSignout}>
                <button className="bg-red-600 text-white rounded px-4 py-3 cursor-pointer transition-all text-lg font-medium duration-200 ease-in ">
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="space-x-2 flex md:ml-16 ml-5  items-center">
                <NavLink to="login" onClick={closeMobileMenu}>
                  <button className=" items-center rounded bg-gray-400   px-6 py-2 cursor-pointer hover:bg-gray-500 transition-all text-lg font-medium duration-200 ease-in ">
                    Log In
                  </button>
                </NavLink>

                {isMobile ? null : (
                  <NavLink to="signup">
                    <button className=" bg-blue-600 text-white rounded px-6 py-2 cursor-pointer font-bold text-lg transition-all duration-300 ">
                      Sign Up
                    </button>
                  </NavLink>
                )}
              </div>
            )}
            {/* menu btn only mobile devices */}
            <div className="md:hidden">
              <button
                onClick={toggleMenu}
                className="focus:outline-none focus:text-gray-500 "
              >
                {isMenuOpen ? (
                  <FaXmark className="h-6 w-6 text-neutral-700 " />
                ) : (
                  <FaBars className="h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </nav>
        {/* nav items for mobile devices */}
        <div>
          <ul
            className={`md:hidden block text-medium space-y-4 px-4 py-5 mt-20 bg-white ${
              isMenuOpen ? "fixed top-0 left-0 w-full transition-all ease-out duration-150" : "hidden"
            }`}
          >
            {navItems.map(({ link, path }) => (
              <li className="text-black" key={path}>
                <NavLink
                  to={path}
                  onClick={closeMobileMenu}
                  className="block px-3 py-2 rounded-md text-gray-700 hover:text-blue-600 hover:bg-gray-100 transition duration-300"
                >
                  {link}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </>
  );
}

export default Navbar;
