//hooks
import { useContext } from "react";

//context
import AuthContext from "../context/AuthContext";

const Orders = () => {
  const { users } = useContext(AuthContext);
  const orderKey = `orders-${users.email}`;
  const orders = JSON.parse(localStorage.getItem(orderKey)) || [];

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
                    {order.items.reduce((sum, item) => sum + item.quantity, 0)}
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
        </div>
      </div>
    </div>
  );
};

export default Orders;
