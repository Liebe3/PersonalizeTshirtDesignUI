import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Header from "./components/ui/Header";
import RegisterPage from "./auth/RegisterPage";
import LoginPage from "./auth/LoginPage";
import AboutPage from "./pages/AboutPage";
import ProductPage from "./pages/ProductPage";
import ProductListPage from "./pages/ProductListPage";
import CartPage from "./pages/CartPage";
import PurchasePage from "./pages/PurchasePage";
import OrdersPage from "./pages/OrdersPage";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path={"/"} element={<HomePage />} />
        <Route path={"about"} element={<AboutPage />} />
        <Route path={"/product"} element={<ProductListPage />} />
        <Route path={"/product/:id"} element={<ProductPage />} />
        <Route path={"/cart"} element={<CartPage />} />
        <Route path={"/purchase"} element={<PurchasePage />} />
        <Route path={"/orders"} element={<OrdersPage />} />
        <Route path={"/register"} element={<RegisterPage />} />
        <Route path={"/login"} element={<LoginPage />} />
      </Routes>
    </Router>
  );
}

export default App;
