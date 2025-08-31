// hooks
import { useEffect, useState } from "react";

// libraries
import * as motion from "motion/react-client";
import { Link } from "react-router-dom";

// data
import productsData from "../data/Product";

// components
import Loading from "../components/states/Loading";

import ProductCard from "../components/product/ProductCard";

const HomePage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // simulate fetch
    setTimeout(() => {
      setProducts(productsData.slice(0, 3)); // show 3 featured
      setLoading(false);
    }, 1000);
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen w-full dark:bg-[#0d1117] dark:text-[#f0f6fc] relative">
      <div className="max-w-7xl w-full mx-auto">
        {/* hero */}
        <main className="py-16 md:py-20">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* text */}
            <div className="space-y-6 text-center md:text-start px-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                <span className="text-blue-600 dark:text-blue-400">
                  Personalized Tees <br />
                </span>
                Designed Just for You
              </h1>
              <p className="text-lg text-gray-500 dark:text-gray-400 leading-relaxed">
                Express yourself with{" "}
                <span className="text-blue-600 dark:text-blue-400">
                  TShirtTask
                </span>
                . Pick from our designs or create your own. Fast nationwide
                shipping, easy payments.
              </p>
              <div className="flex gap-4 pt-4 justify-center md:justify-start">
                <Link to={"/shop"}>
                  <button className="px-8 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 cursor-pointer">
                    Shop Now
                  </button>
                </Link>
                <Link to={"/about"}>
                  <button className="px-8 py-3 border border-blue-600 text-blue-600 dark:text-blue-400 rounded-lg font-semibold hover:bg-blue-50 dark:hover:bg-blue-900/20 cursor-pointer">
                    Learn More
                  </button>
                </Link>
              </div>
            </div>

            {/* hero image */}
            <div className="relative mx-6 md:mx-0">
              <div className="aspect-square rounded-2xl overflow-hidden shadow-2xl">
                <motion.img
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{
                    duration: 0.5,
                    scale: { type: "spring", bounce: 0.3 },
                  }}
                  src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1000&q=80"
                  alt="Custom T-shirt"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </main>

        {/* featured products */}
        <section className="container mx-auto px-4 py-16 bg-gradient-to-br">
          <div className="text-center md:text-start mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2 capitalize">
              Featured Products
            </h2>
            <div className="w-24 h-1 bg-blue-600 dark:bg-blue-400 mx-auto md:ml-30 rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 md:gap-8 ">
            {products.map((product) => (
              <div key={product.id}>
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
};

export default HomePage;
