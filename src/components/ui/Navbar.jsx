//hooks
import { useEffect, useState, useContext } from "react";

//libraries
import clsx from "clsx";
import { NavLink } from "react-router-dom";
import { IoMdMenu } from "react-icons/io";
import { IoCloseSharp } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

//context
import AuthContext from "../../context/AuthContext";

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "Product", href: "/product" },
  { name: "About", href: "/about" },
  { name: "Cart", href: "/cart" },
];

const iconVariants = {
  initial: { scale: 0, opacity: 0 },
  animate: { scale: 1, opacity: 1 },
  exit: { scale: 0, opacity: 0 },
};

const Navbar = () => {
  const { users } = useContext(AuthContext);
  const LOGIN_LINKS = users
    ? [
        ...NAV_LINKS,
        { name: "Purchase ", href: "/purchase " },
        // { name: "Orders", href: "/orders  " },
      ]
    : NAV_LINKS;

  const [openMenu, setOpenMenu] = useState(false);

  // prevent from scrolling in mobile menu
  useEffect(() => {
    if (openMenu) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }
    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [openMenu]);

  return (
    <nav className="flex h-full relative items-center">
      <ul className=" items-center space-x-4 h-full mr-3 hidden lg:flex">
        {LOGIN_LINKS.map((link) => (
          <li key={link.name} className="text-2xl ">
            <NavLink
              to={link.href}
              className={({ isActive }) =>
                clsx(
                  isActive
                    ? "border-b-2 font-medium text-[#447D9B]"
                    : "hover:text-[#447D9B]"
                )
              }
            >
              {link.name}
            </NavLink>
          </li>
        ))}
      </ul>
      <AnimatePresence mode="wait">
        <motion.button
          key={openMenu ? "close" : "menu"}
          onClick={() => setOpenMenu(!openMenu)}
          className="text-3xl flex lg:hidden cursor-pointer"
          variants={iconVariants}
          initial="initial"
          animate="animate"
          exit="exit"
          whileTap={{ scale: 0.85 }}
          transition={{ duration: 0.1 }}
        >
          {openMenu ? <IoCloseSharp /> : <IoMdMenu />}
        </motion.button>
      </AnimatePresence>

      {/* mobile navigation */}
      {openMenu && (
        <div className="fixed inset-0 bg-[#0d1117] text-[#f0f6fc] z-50 lg:hidden overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.button
              key={openMenu ? "close" : "menu"}
              onClick={() => setOpenMenu(!openMenu)}
              className="text-3xl flex lg:hidden absolute top-16 left-24 cursor-pointer"
              variants={iconVariants}
              initial="initial"
              animate="animate"
              exit="exit"
              whileTap={{ scale: 0.85 }}
              transition={{ duration: 0.1 }}
            >
              {openMenu ? <IoCloseSharp /> : <IoMdMenu />}
            </motion.button>
          </AnimatePresence>

          <ul className="flex flex-col items-center justify-center space-y-4 h-full mr-3 lg:hidden">
            {LOGIN_LINKS.map((link) => (
              <li key={link.name} className="text-2xl ">
                <NavLink
                  onClick={() => setOpenMenu(false)}
                  to={link.href}
                  className={({ isActive }) =>
                    clsx(
                      isActive
                        ? "border-b-2 font-medium text-[#447D9B]"
                        : "hover:text-[#447D9B]"
                    )
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
