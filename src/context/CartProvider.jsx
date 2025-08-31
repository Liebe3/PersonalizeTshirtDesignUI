//hooks
import { useContext, useEffect, useState } from "react";

//libraries
import Swal from "sweetalert2";

//context
import CartContext from "./CartContext";
import AuthContext from "./AuthContext";

const CartProvider = ({ children }) => {
  const { users } = useContext(AuthContext);

  // Initialize cart state based on user status
  const [carts, setCarts] = useState(() => {
    if (users && users.email) {
      const userCart = localStorage.getItem(`cart-${users.email}`);
      return userCart ? JSON.parse(userCart) : [];
    } else {
      const guestCart = localStorage.getItem("guest-cart");
      return guestCart ? JSON.parse(guestCart) : [];
    }
  });

  // Update cart when user changes (login/logout)
  useEffect(() => {
    if (users && users.email) {
      const userCart = localStorage.getItem(`cart-${users.email}`);
      if (userCart) {
        setCarts(JSON.parse(userCart));
      }
    } else {
      const guestCart = localStorage.getItem("guest-cart") || "[]";
      setCarts(JSON.parse(guestCart));
    }
  }, [users]);

  // Save cart changes to localStorage
  useEffect(() => {
    if (users && users.email) {
      localStorage.setItem(`cart-${users.email}`, JSON.stringify(carts));
    } else {
      localStorage.setItem("guest-cart", JSON.stringify(carts));
    }
  }, [carts, users]);

  //check if product and product.id is exist
  const handleAddToCart = (product) => {
    if (!product || !product.id) {
      return;
    }

    // Normalize the product data to ensure numbers
    const normalizedProduct = {
      ...product,
      price: Number(product.price),
      discountPercentage: Number(product.discountPercentage || 0),
    };

    setCarts((prevCart) => {
      const existingItem = prevCart.find((item) => item.id === product.id);

      if (!existingItem) {
        return [...prevCart, { ...normalizedProduct, quantity: 1 }];
      } else {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
    });
    Swal.fire("Item Added to cart!", "", "success");
  };

  const handleRemoveCart = (removeId) => {
    const filteredCart = carts.filter((cart) => cart.id !== removeId);
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes",
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Removed",
          text: "Your item has been removed",
          icon: "success",
        });
        setCarts(filteredCart);
      }
    });
  };

  const updateCartQuantity = (productId, newQuantity) => {
    setCarts((prevCart) =>
      prevCart.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  //total price
  const totalPrice = carts.reduce((initialValue, item) => {
    return initialValue + Number(item.price) * item.quantity;
  }, 0);

  // total discount
  const totalDiscount = carts.reduce((initialValue, item) => {
    const discountRate = Number(item.discountPercentage) || 0;
    const discount = Number(item.price) * item.quantity * (discountRate / 100);
    return initialValue + discount;
  }, 0);

  //total price with disccount
  const totalDiscountedPrice = totalPrice - totalDiscount;

  return (
    <CartContext.Provider
      value={{
        handleAddToCart,
        carts,
        setCarts,
        handleRemoveCart,
        updateCartQuantity,
        totalPrice,
        totalDiscount,
        totalDiscountedPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartProvider;
