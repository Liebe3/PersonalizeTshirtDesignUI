//hooks
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

//context
import AuthContext from "../context/AuthContext";

const Orders = () => {
  const { users } = useContext(AuthContext);
  const orderKey = `orders-${users.email}`;
  const orders = JSON.parse(localStorage.getItem(orderKey)) || [];
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-[#0d1117] py-14">
      <div className="max-w-7xl mx-auto px-6">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-10">
          Your Orders
        </h1>
        <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
          Total Orders:{" "}
          <span className=" text-2xl font-bold text-blue-600 ">
            {orders.length}
          </span>
        </h2>

        {/* Scrollable container */}
        <div className="w-full overflow-x-auto">
          {orders.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 bg-white dark:bg-gray-900 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
              {/* Icon */}
              <svg
                className="w-16 h-16 text-gray-400 dark:text-gray-600 mb-4"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 3h18M9 3v18M15 3v18M3 9h18M3 15h18"
                />
              </svg>

              <h2 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
                No Orders Yet
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-6 text-center max-w-md">
                Looks like you haven’t placed any orders. Start shopping now and
                your orders will appear here!
              </p>

              <button
                onClick={() => navigate("/product")}
                className="px-6 py-2 rounded-xl bg-blue-600 text-white font-medium shadow hover:bg-blue-700 transition cursor-pointer"
              >
                Shop Now
              </button>
            </div>
          ) : (
            <table className="w-full table-auto bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 text-base">
              <thead className="bg-gray-100 dark:bg-gray-800 text-left text-gray-700 dark:text-gray-300">
                <tr>
                  <th className="px-6 py-4 whitespace-nowrap">#</th>
                  <th className="px-6 py-4 whitespace-nowrap">Name</th>
                  <th className="px-6 py-4 whitespace-nowrap">Address</th>
                  <th className="px-6 py-4 whitespace-nowrap">Quantity</th>
                  <th className="px-6 py-4 whitespace-nowrap">Total</th>
                  <th className="px-6 py-4 whitespace-nowrap">Date</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {orders.map((order, index) => (
                  <tr
                    key={index}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800 dark:text-gray-200 whitespace-nowrap">
                      {index + 1}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {order.firstName}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {order.address}
                    </td>
                    <td className="px-6 py-4 text-gray-700 dark:text-gray-300 whitespace-nowrap">
                      {order.items.reduce(
                        (sum, item) => sum + item.quantity,
                        0
                      )}
                    </td>
                    <td className="px-6 py-4 text-green-600 dark:text-green-400 whitespace-nowrap">
                      $
                      {order.total.toLocaleString(undefined, {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-gray-400 whitespace-nowrap">
                      {order.date}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;
