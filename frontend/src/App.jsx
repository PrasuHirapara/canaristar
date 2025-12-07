import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Footer from "./Layout/Footer";
import Header from "./Layout/Header";
import Cart from "./pages/Cart";
import Contact from "./pages/Contact";
import ContactDetails from "./pages/ContactDetails";
import CreateProduct from "./pages/CreateProduct";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import NotFound from "./pages/NotFound";
import Orders from "./pages/Orders";
import OTP from "./pages/OTP";
import ProductDetails from "./pages/ProductDetails";
import Profile from "./pages/Profile";
import SearchProducts from "./pages/SearchProducts";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Analytics from "./components/Analytics";
import AdminProductDataDetails from "./pages/AdminProductDataDetails";

function App() {
  return (
    <Router>
      <Header />

      <ToastContainer theme="dark" />
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/otp-verification/:email" element={<OTP />} />

        <Route path="/search" element={<SearchProducts />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/analytics" element={<Analytics />} />

        <Route path="/product-details/:id" element={<ProductDetails />} />
        <Route path="/contact-details/:id" element={<ContactDetails />} />

        <Route path="/create-product" element={<CreateProduct />} />
        <Route
          path="/admin-product-data-details/:id"
          element={<AdminProductDataDetails />}
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
