// Enhanced ProductPage with T-shirt customization
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import CartContext from "../context/CartContext";
import ProductsNotFound from "../components/states/ProductsNotFound";
import Loading from "../components/states/Loading";
import productsData from "../data/Product";
import clsx from "clsx";

const ProductPage = () => {
  const PRODUCT_LINK = [
    { name: "Home", href: "/" },
    { name: "Product", href: "/product" },
  ];

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { handleAddToCart } = useContext(CartContext);

  const [activeSize, setActiveSize] = useState(null);
  const [activeColor, setActiveColor] = useState(null);

  useEffect(() => {
    setLoading(true);
    const found = productsData.find((item) => item.id === parseInt(id));
    setProduct(found || null);
    setLoading(false);
  }, [id]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen w-full dark:bg-[#0d1117] dark:text-[#f0f6fc] bg-gray-50">
      <div className="max-w-7xl w-full mx-auto py-8">
        {product ? (
          <>
            {/* Breadcrumbs */}
            <div className="flex space-x-2 text-sm text-gray-600 max-w-6xl mx-auto mb-5 px-5 lg:px-0">
              {PRODUCT_LINK.map((link, index) => (
                <span
                  key={link.name}
                  className="flex items-center space-x-3 text-sm text-black dark:text-white"
                >
                  <Link
                    to={link.href}
                    className="hover:text-blue-500 transition-colors"
                  >
                    <h1>{link.name}</h1>
                  </Link>
                  {index < PRODUCT_LINK.length - 1 && (
                    <span className="text-gray-400">{" > "}</span>
                  )}
                </span>
              ))}
            </div>

            {/* Product Details */}
            <div className="bg-white dark:bg-[#161b22] rounded-xl shadow-lg border border-gray-200 dark:border-[#30363d] overflow-hidden max-w-6xl mx-auto">
              <div className="p-8 grid md:grid-cols-2 gap-12">
                {/* Image */}
                <div className="bg-gray-50 dark:bg-[#0d1117] rounded-lg p-6 flex flex-col items-center justify-center">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full max-h-[400px] object-contain rounded-lg"
                  />
                </div>

                {/* Product Info & Customization UI */}
                <div className="flex flex-col justify-center space-y-6">
                  <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                    ₱{product.price}
                  </p>
                  <div>
                    <h1 className="text-4xl font-bold mb-3 text-gray-900 dark:text-[#f0f6fc]">
                      {product.name}
                    </h1>
                    <p className="text-gray-600 dark:text-[#8b949e] text-lg leading-relaxed">
                      {product.description}
                    </p>
                  </div>

                  {/* Stock Status */}
                  <div className="text-xl tracking-wider">
                    {product.stock < 5 ? (
                      <p className="text-red-600 font-bold">
                        Only {product.stock} left in stock!
                      </p>
                    ) : (
                      <p className="text-gray-600">
                        Available: {product.stock}
                      </p>
                    )}
                  </div>

                  {/* Just the Customization UI */}
                  {product.customizable && (
                    <div className="space-y-6 border-t border-gray-200 dark:border-[#30363d] pt-6">
                      <h3 className="text-xl font-semibold">
                        Customize Your T-Shirt
                      </h3>

                      {/* Custom Text */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Your Text
                        </label>
                        <input
                          type="text"
                          placeholder="Enter your custom text"
                          className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                          maxLength={30}
                        />
                      </div>

                      {/* Text Options */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Font Size
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white cursor-pointer">
                            <option>Small</option>
                            <option>Medium</option>
                            <option>Large</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Text Color
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white cursor-pointer">
                            <option>Black</option>
                            <option>White</option>
                            <option>Red</option>
                            <option>Blue</option>
                            <option>Gold</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium mb-2">
                            Text Position
                          </label>
                          <select className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white cursor-pointer">
                            <option>Top</option>
                            <option>Center</option>
                            <option>Bottom</option>
                          </select>
                        </div>
                      </div>

                      {/* Size Selection */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          Select Size
                        </label>
                        <div className="flex gap-2">
                          {product.sizes.map((size) => (
                            <button
                              key={size}
                              onClick={() => setActiveSize(size)}
                              className={clsx(
                                "px-4 py-2 rounded-lg border transition-colors cursor-pointer",
                                activeSize === size
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
                              )}
                            >
                              {size}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Color Selection */}
                      <div>
                        <label className="block text-sm font-medium mb-2">
                          T-Shirt Color
                        </label>
                        <div className="flex gap-2">
                          {product.colors.map((color) => (
                            <button
                              key={color}
                              onClick={() => setActiveColor(color)}
                              className={clsx(
                                "px-4 py-2 rounded-lg border transition-colors cursor-pointer",
                                activeColor === color
                                  ? "bg-blue-600 text-white border-blue-600"
                                  : "hover:bg-gray-50 dark:hover:bg-gray-700 border-gray-300 dark:border-gray-600"
                              )}
                            >
                              {color}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Add to Cart */}
                  <div className="border-t border-gray-200 dark:border-[#30363d] pt-6">
                    <button
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 cursor-pointer text-lg"
                      onClick={() => handleAddToCart(product)}
                    >
                      Add to Cart - ₱{product.price}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : (
          <ProductsNotFound />
        )}
      </div>
    </div>
  );
};
export default ProductPage;
