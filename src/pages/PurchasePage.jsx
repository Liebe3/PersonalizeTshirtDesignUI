import { useState, useContext, use } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

import CartContext from "../context/CartContext";
import AuthContext from "../context/AuthContext";

const PurchasePage = () => {
  const { carts, setCarts, totalPrice, totalDiscount, totalDiscountedPrice } =
    useContext(CartContext);
  const { users } = useContext(AuthContext);
  const navigate = useNavigate();

  // Customer Information
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [zip, setZip] = useState("");

  // Shipping Information
  const [shippingMethod, setShippingMethod] = useState("standard");
  const [deliveryNotes, setDeliveryNotes] = useState("");

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const clearForm = () => {
    setFirstName("");
    setLastName("");
    setEmail("");
    setNumber("");
    setAddress("");
    setCity("");
    setRegion("");
    setZip("");
    setDeliveryNotes("");
  }

  // Shipping rates for nationwide delivery
  const shippingRates = {
    standard: { name: "Standard Shipping (5-7 days)", cost: 150 },
    express: { name: "Express Shipping (2-3 days)", cost: 300 },
    overnight: { name: "Overnight Delivery (1 day)", cost: 500 },
  };

  const shippingCost = shippingRates[shippingMethod].cost;
  const finalTotal = totalDiscountedPrice + shippingCost;

  const handleSubmit = (event) => {
    event.preventDefault();
    setError("");

    if (totalDiscountedPrice === 0) {
      Swal.fire({
        icon: "error",
        title: "Empty Cart",
        text: "Please add items to your cart before checkout",
      });
      navigate("/product");
      return;
    }

    if (
      !finalTotal ||
      !firstName ||
      !email ||
      !number ||
      !address ||
      !city ||
      !region ||
      !zip
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    setLoading(true);

    setTimeout(() => {
      const shippingCost = shippingRates[shippingMethod].cost;
      const finalTotal = totalDiscountedPrice + shippingCost;

      const newOrder = {
        orderNumber: `ORD-${Date.now()}`,
        firstName,
        lastName,
        email,
        number,
        address: `${address}, ${city}, ${region} ${zip}`,
        city,
        region,
        zip,
        items: carts,
        subtotal: totalPrice,
        discount: totalDiscount,
        shippingCost,
        total: finalTotal,
        paymentMethod: "Credit/Debit Card", // simplified static
        shippingMethod: shippingRates[shippingMethod].name,
        deliveryNotes,
        status: "Processing",
        date: new Date().toLocaleString("en-PH", {
          timeZone: "Asia/Manila",
          dateStyle: "medium",
          timeStyle: "short",
        }),
      };

      const orderKey = `orders-${users.email}`;
      const existingOrders = JSON.parse(localStorage.getItem(orderKey)) || [];
      const updatedOrders = [...existingOrders, newOrder];
      localStorage.setItem(orderKey, JSON.stringify(updatedOrders));

      localStorage.removeItem(`cart-${users.email}`);
      setCarts([]);

      Swal.fire({
        title: "Order Placed Successfully!",
        icon: "success",
        showConfirmButton: true,
        timer: 3000,
      });
      clearForm();
      navigate("/orders");
      setLoading(false);
    }, 2000);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-[#0d1117] py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Checkout
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Complete your merchandise order
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            {/* Customer Information */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Customer Information
                </h2>
              </div>
              <div className="p-6">
                <form
                  onSubmit={handleSubmit}
                  id="checkoutForm"
                  className="space-y-4"
                >
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <input
                      value={firstName}
                      type="text"
                      placeholder="First Name *"
                      required
                      onChange={(e) => setFirstName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                    <input
                      value={lastName}
                      type="text"
                      placeholder="Last Name"
                      onChange={(e) => setLastName(e.target.value)}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                  <input
                    value={email}
                    type="email"
                    placeholder="Email Address *"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    value={number}
                    type="tel"
                    placeholder="Phone Number (11 digits) *"
                    required
                    maxLength="11"
                    onChange={(e) => {
                      const value = e.target.value;
                      if (/^\d*$/.test(value)) setNumber(value);
                    }}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </form>
                {error && (
                  <p className="text-red-600 font-medium mt-2">{error}</p>
                )}
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Shipping Address
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <input
                  value={address}
                  type="text"
                  placeholder="Street Address *"
                  required
                  form="checkoutForm"
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <input
                    value={city}
                    type="text"
                    placeholder="City *"
                    required
                    form="checkoutForm"
                    onChange={(e) => setCity(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    value={region}
                    type="text"
                    placeholder="Region/Province *"
                    required
                    form="checkoutForm"
                    onChange={(e) => setRegion(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    value={zip}
                    type="text"
                    placeholder="ZIP Code *"
                    required
                    form="checkoutForm"
                    onChange={(e) => setZip(e.target.value)}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>
                <textarea
                  value={deliveryNotes}
                  onChange={(e) => setDeliveryNotes(e.target.value)}
                  placeholder="Delivery Notes (Optional)"
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            {/* Payment Method (UI only) */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Payment Method
                </h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors border-blue-500 bg-blue-50 dark:bg-blue-900/20">
                    <span className="font-medium text-gray-900 dark:text-white">
                      Credit/Debit Card
                    </span>
                  </div>
                  <div className="p-4 border rounded-lg flex items-center justify-center gap-2 cursor-pointer transition-colors border-gray-300 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <span className="font-medium text-gray-900 dark:text-white">
                      Cash on Delivery
                    </span>
                  </div>
                </div>

                {/* Static Credit Card Fields */}
                <div className="space-y-4 mt-6">
                  <input
                    type="text"
                    placeholder="Cardholder Name *"
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                  <input
                    type="text"
                    placeholder="Card Number *"
                    maxLength={19}
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <input
                      type="text"
                      placeholder="MM/YY *"
                      maxLength={5}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                    <input
                      type="text"
                      placeholder="CVV *"
                      maxLength={4}
                      className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Options */}
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                  Shipping Options
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Nationwide delivery available
                </p>
              </div>
              <div className="p-6 space-y-3">
                {Object.entries(shippingRates).map(([key, option]) => (
                  <label
                    key={key}
                    className="flex items-center space-x-3 cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="shipping"
                      value={key}
                      checked={shippingMethod === key}
                      onChange={(e) => setShippingMethod(e.target.value)}
                      className="form-radio h-5 w-5 text-blue-600"
                    />
                    <span className="text-gray-900 dark:text-white">
                      {option.name} - ₱{option.cost}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 h-fit">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              Order Summary
            </h2>
            <div className="space-y-2">
              {carts.length > 0 ? (
                carts.map((item, index) => (
                  <div
                    key={index}
                    className="flex justify-between text-gray-700 dark:text-gray-300"
                  >
                    <span>
                      {item.name}
                      {item.customization
                        ? ` (${item.customization.size}, ${item.customization.color})`
                        : ""}
                    </span>
                    <span>₱{item.price}</span>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 dark:text-gray-400">
                  No items in cart
                </p>
              )}
            </div>

            <div className="border-t border-gray-200 dark:border-gray-700 mt-4 pt-4 space-y-2">
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Subtotal:</span>
                <span>₱{totalPrice}</span>
              </div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Discount:</span>
                <span>-₱{totalDiscount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-gray-700 dark:text-gray-300">
                <span>Shipping Fee:</span>
                <span>₱{shippingRates[shippingMethod].cost}</span>
              </div>
              <div className="flex justify-between text-gray-900 dark:text-white font-semibold">
                <span>Total:</span>
                <span>₱{finalTotal.toFixed(2)}</span>
              </div>
            </div>

            <button
              onClick={handleSubmit}
              disabled={loading}
              className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold transition-all duration-200 shadow-md hover:shadow-lg cursor-pointer"
            >
              {loading ? "Processing..." : "Place Order"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchasePage;
