"use client"

//libraries
import { useNavigate } from "react-router-dom"
import { motion } from "motion/react"
import { FiStar, FiShield, FiTruck, FiAward, FiGlobe } from "react-icons/fi"

const AboutPage = () => {
  const values = [
    {
      icon: FiAward,
      title: "High-Quality Fabric",
      description: "We use only the finest materials to ensure comfort, durability, and a premium look.",
    },
    {
      icon: FiTruck,
      title: "Nationwide Shipping",
      description: "Fast and reliable delivery straight to your doorstep, anywhere in the country.",
    },
    {
      icon: FiShield,
      title: "Secure Payments",
      description: "Shop with confidence — all credit card transactions are fully encrypted and safe.",
    },
    {
      icon: FiGlobe,
      title: "Personalized Designs",
      description: "Express yourself with one-of-a-kind T-shirts, custom-printed to match your style.",
    },
  ]

  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-white mb-4">
            About <span className="text-blue-600">TShirtTask</span>
          </h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            We're on a mission to help you express your unique style with personalized, high-quality T-shirts — designed
            by you, made by us.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-center mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-6">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 leading-relaxed max-w-3xl mx-auto">
            At TShirtTask, we believe fashion is personal. We empower you to create your own designs for daily wear,
            special occasions, or group events. From bold graphics to subtle statements, our goal is to make every shirt
            a reflection of your individuality while ensuring comfort, quality, and durability.
          </p>
        </motion.div>

        <div className="mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white text-center mb-8"
          >
            Why Choose Us?
          </motion.h2>

          <div className="grid md:grid-cols-2 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.6 + index * 0.1 }}
                className="flex items-start gap-4 p-6 bg-gray-50 dark:bg-gray-800 rounded-lg"
              >
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex-shrink-0">
                  <value.icon className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white mb-2">{value.title}</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">{value.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1 }}
          className="text-center bg-blue-50 dark:bg-gray-800 rounded-xl p-8"
        >
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Ready to Design Your Own Tee?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-xl mx-auto">
            Join thousands of creators who made their ideas wearable. Start customizing today.
          </p>
          <motion.button
            onClick={() => navigate("/product")}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-200 inline-flex items-center gap-2 cursor-pointer"
          >
            <FiStar className="w-4 h-4 " />
            Shop Now
          </motion.button>
        </motion.div>
      </div>
    </div>
  )
}

export default AboutPage
