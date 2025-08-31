//hooks
import { useContext } from "react";

//libraries
import { motion } from "framer-motion";
import { FiCreditCard } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

// context
import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";

//components
import CartItemPage from "./CartItemPage";
import CartEmpty from "../components/states/CartEmpty"

const CartPage = () => {
  const { carts, totalPrice, totalDiscount, totalDiscountedPrice } =
    useContext(CartContext);
  const { users } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleProceedToCheckout = () => {
    if (!users) {
      navigate("/login");
    } else {
      navigate("/purchase");
    }
  };
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] dark:text-[#f0f6fc] py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {carts.length === 0 ? (
          <CartEmpty />
        ) : (
          <div className="lg:grid lg:grid-cols-12 lg:gap-8">
            {/* Cart Items - Left Side */}
            <div className="lg:col-span-8">
              <div className="space-y-4">
                {carts.map((cart) => {
                  return <CartItemPage key={cart.id} cart={cart} />;
                })}
              </div>
            </div>

            {/* Order Summary - Right Side */}
            <div className="lg:col-span-4 mt-8 lg:mt-0">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-white dark:bg-[#21262d] rounded-xl border border-gray-200 dark:border-[#30363d] p-6 shadow-sm sticky top-8"
              >
                <h2 className="text-xl font-bold mb-6 text-gray-900 dark:text-[#f0f6fc]">
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  <div className="flex justify-between items-center text-gray-700 dark:text-gray-300">
                    <span>Subtotal:</span>
                    <span className="font-semibold">
                      ₱{totalPrice.toFixed(2)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center text-green-600 dark:text-green-400">
                    <span>Discount:</span>
                    <span className="font-semibold">
                      -₱{totalDiscount.toFixed(2)}
                    </span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-[#30363d] pt-4">
                    <div className="flex justify-between items-center text-lg font-bold text-gray-900 dark:text-[#f0f6fc]">
                      <span>Order total:</span>
                      <span>₱{totalDiscountedPrice.toFixed(2)}</span>
                    </div>
                  </div>
                </div>

                <motion.button
                  onClick={handleProceedToCheckout}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors flex items-center justify-center gap-2 mb-4"
                >
                  {users ? (
                    <span className="flex items-center gap-2">
                      <FiCreditCard /> Proceed to Checkout
                    </span>
                  ) : (
                    <span>Please Login to Checkout</span>
                  )}
                </motion.button>
              </motion.div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;