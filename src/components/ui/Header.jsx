// hooks
import { useContext } from "react";

// library
import { Link } from "react-router-dom";
import { MdDarkMode, MdBackHand } from "react-icons/md";
import { FiSun } from "react-icons/fi";
import { FaShoppingCart } from "react-icons/fa";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

//context
import ThemeContext from "../../context/ThemeContext";
import CartContext from "../../context/CartContext";
import AuthContext from "../../context/AuthContext";

// components
import Navbar from "./Navbar";

//assets

const Header = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { carts, setCarts } = useContext(CartContext);
  const { users, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    logout();
    navigate("/");

    const guestCart = JSON.parse(localStorage.getItem("guest-cart")) || [];
    setCarts(guestCart);
  };

  const totalItems = carts.reduce((total, item) => total + item.quantity, 0);

  return (
    <>
      <div className="w-full bg-[#0d1117] h-13 ">
        <div className="max-w-7xl mx-auto h-full">
          <div className="w-full flex justify-center lg:justify-end items-center h-full">
            <div className="mr-4  font-medium text-white py-2.5 px-5 rounded-md  duration-150 ">
              {users ? (
                <>
                  Welcome,{" "}
                  {users.firstname.charAt(0).toUpperCase() +
                    users.firstname.slice(1)}
                  <MdBackHand className="inline-block text-orange-300 hover:text-orange-200 transition-colors duration-150 hover:animate-pulse ml-1" />
                </>
              ) : (
                <Link to={"/login"}>
                  <button className="cursor-pointer"> Sign in / Login</button>
                </Link>
              )}
            </div>

            {users ? (
              <button
                onClick={handleLogOut}
                className="mr-4 cursor-pointer text-red-600 font-medium py-2.5 px-5 border border-red-600 hover:bg-red-600 hover:text-white transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 rounded-sm"
              >
                Logout
              </button>
            ) : (
              <Link to="/register">
                <button className="mr-4 cursor-pointer text-white font-medium py-2.5 px-5 transition-colors duration-200  rounded-sm">
                  Create an Account
                </button>
              </Link>
            )}
          </div>
        </div>
      </div>

      <header className="w-full h-20 dark:bg-[#0d1117] dark:text-[#f0f6fc] border-b-2 border-b-black dark:border-b-[#f0f6fc]">
        <div className="flex max-w-7xl justify-between mx-auto px-4 sm:px-6 lg:px-8 h-full">
          <div className="flex w-full items-center">
            <div className="h-full flex items-center mr-5">
              <span className="text-2xl md:text-3xl font-extrabold tracking-wide text-blue-600 dark:text-blue-400">
                T
              </span>
              <h1 className="text-xl md:text-2xl font-bold text-gray-800 dark:text-[#f0f6fc] tracking-wide">
                -SHTASK
              </h1>
            </div>
            <Navbar />
          </div>

          <div className="h-full w-full max-w-[300px] flex items-center justify-end cursor-pointer space-x-1">
            <motion.button
              key={theme}
              onClick={toggleTheme}
              className="text-3xl p-3 cursor-pointer"
              initial={{ rotate: 0, scale: 0.8 }}
              animate={{ rotate: 360, scale: 1 }}
              whileTap={{ scale: 1.25 }}
              transition={{ type: "spring", duration: 0.16 }}
            >
              {theme === "dark" ? <FiSun /> : <MdDarkMode />}
            </motion.button>

            <Link to={"/cart"} className="relative">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="relative text-2xl p-3 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 bg-white dark:bg-gray-900 shadow-md hover:shadow-lg border border-gray-200 dark:border-gray-700 cursor-pointer transition-all duration-200"
              >
                <FaShoppingCart />

                {totalItems > 0 && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full min-w-[20px] h-5 flex items-center justify-center px-1 shadow-lg border-2 border-white dark:border-gray-900"
                  >
                    {totalItems > 99 ? "99+" : totalItems}
                  </motion.div>
                )}
              </motion.button>
            </Link>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
