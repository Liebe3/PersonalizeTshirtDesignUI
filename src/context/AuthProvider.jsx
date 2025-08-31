//hooks
import { useEffect, useState } from "react";

import Swal from "sweetalert2";

// Context
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [users, setUsers] = useState(() => {
    try {
      const storedUser = localStorage.getItem("users");
      return storedUser ? JSON.parse(storedUser) : null;
    } catch (error) {
      console.error("Failed to parse stored user from local storage", error);
      return null;
    }
  });

  useEffect(() => {
    if (users) {
      localStorage.setItem("users", JSON.stringify(users));
    }
  }, [users]);

  const login = (userData) => {
    localStorage.setItem("users", JSON.stringify(userData));
    setUsers(userData);

    // Get guest cart and user's existing cart
    const guestCart = JSON.parse(localStorage.getItem("guest-cart") || "[]");
    const userCartKey = `cart-${userData.email}`;
    let existingUserCart = JSON.parse(
      localStorage.getItem(userCartKey) || "[]"
    );

    // Merge guest cart with user cart if there's a guest cart
    if (guestCart.length > 0) {
      // Combine carts and handle duplicates
      guestCart.forEach((guestItem) => {
        const existingItem = existingUserCart.find(
          (item) => item.id === guestItem.id
        );
        if (existingItem) {
          existingItem.quantity += guestItem.quantity;
        } else {
          existingUserCart.push(guestItem);
        }
      });

      // Save merged cart
      localStorage.setItem(userCartKey, JSON.stringify(existingUserCart));
      // Clear guest cart
      localStorage.removeItem("guest-cart");
    }
      Swal.fire({
      title: "Logged in successful!",
      icon: "success",
      draggable: true,
    });
  };

  const logout = () => {
    setUsers(null);
    localStorage.removeItem("users");
    // Don't clear the user's cart when logging out
    // Just initialize an empty guest cart
    localStorage.setItem("guest-cart", JSON.stringify([]));
    Swal.fire({
      title: "Logged out!",
      icon: "success",
      draggable: true,
    });
  };

  return (
    <AuthContext.Provider value={{ users, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;