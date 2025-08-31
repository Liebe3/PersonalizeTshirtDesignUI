//libraries
import { Link } from "react-router-dom";

const ProductItem = ({ product, productID }) => {
  return (
    <>
      <div className="bg-white dark:bg-[#161b22] rounded-xl shadow-lg border border-gray-200 dark:border-[#30363d] overflow-hidden flex flex-row gap-6 min-h-[300px]">
        {/* Image Section */}

        <div className="relative bg-gray-50 dark:bg-[#0d1117] w-1/2 p-6 flex items-center justify-center">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[250px] object-contain object-center rounded-lg"
          />
        </div>

        {/* Text Content */}
        <div className="flex flex-col justify-between p-6 w-1/2 space-y-5">
          {/* Category */}
          <span className="text-sm uppercase tracking-wide text-blue-600 dark:text-blue-400 font-semibold bg-blue-50 dark:bg-blue-900/30 px-3 py-1 rounded-full w-fit">
            {product.category || "Featured"}
          </span>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white leading-snug">
            {product.name}
          </h2>

          {/* Price (above button) */}
          <p className="text-xl font-semibold text-green-600 dark:text-green-400">
            ₱{product.price}
          </p>

          {/* Button */}
          <Link to={`/product/${productID}`} className="pt-2 mt-auto">
            <button className="w-full bg-blue-600 text-white font-semibold py-3 px-6 rounded-lg shadow-md transition-all duration-200 hover:bg-blue-700 cursor-pointer">
              View Details
            </button>
          </Link>
        </div>
      </div>
    </>
  );
};

export default ProductItem;