//libraries
import { motion } from "framer-motion";
import { FiShoppingCart, FiArrowLeft } from "react-icons/fi";
import { Link } from "react-router-dom";

const CartEmpty = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-md mx-auto"
      >
        {/* Empty Cart Icon */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="mb-8"
        >
          <div className="relative mx-auto w-24 h-24 bg-gray-100 dark:bg-[#21262d] rounded-full flex items-center justify-center">
            <FiShoppingCart className="text-4xl text-gray-400 dark:text-gray-500" />
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
              <span className="text-red-500 text-xs font-bold">0</span>
            </div>
          </div>
        </motion.div>

        {/* Text Content */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="mb-8"
        >
          <h2 className="text-2xl font-bold text-gray-900 dark:text-[#f0f6fc] mb-3">
            Your cart is empty
          </h2>
          <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
            Looks like you haven't added any items to your cart yet. Start
            shopping to fill it up!
          </p>
        </motion.div>

        {/* Action Button */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Link to={"/product"}>
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-lg transition-colors shadow-sm cursor-pointer"
            >
              <FiArrowLeft className="text-sm" />
              Continue Shopping
            </motion.button>
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default CartEmpty;
