//libraries
import { FiSearch, FiShoppingBag } from "react-icons/fi";

const ProductsNotFound = () => {
  return (
    <div className="min-h-screen w-full dark:bg-[#0d1117] dark:text-[#f0f6fc] relative">
      <div className="max-w-7xl w-full mx-auto">
        <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
          <div className="mb-6">
            <div className="relative">
              <FiShoppingBag className="w-16 h-16 text-gray-300 mx-auto mb-2" />
              <FiSearch className="w-6 h-6 text-gray-400 absolute -bottom-1 -right-1" />
            </div>
          </div>

          <h2 className="text-2xl font-semibold  mb-2">No Products Found</h2>

          <p className=" mb-6 max-w-md">
            {
              "We couldn't find any products matching your search. Try adjusting your filters or search terms."
            }
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProductsNotFound;
