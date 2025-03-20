import React, { Suspense, lazy } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header";
import ThreeJSBackground from "./components/ThreeJSBackground";
import Hero from "./components/Hero";
import FeatureCards from "./components/FeatureCards";
import Testimonials from "./components/Testimonials";
import CTASection from "./components/CTAsection";
import Checkout from "./components/Checkout";
import AuthForm from "./components/AuthForm";
import Login from "./components/Login";
import FarmMarketplace from "./components/FarmMarketplace";
import Footer from "./components/Footer"; // Footer stays only on Home & Marketplace
import Cart from "./components/Cart";

// Lazy Load Admin Dashboard
const AdminDashboard = lazy(() => import("./components/AdminDashboard"));

// Home Page Layout
const HomePage = () => (
  <>
    <Hero />
    <FeatureCards />
    <Testimonials />
    <CTASection />
  </>
);

// Layout Component (Footer only on Home & Marketplace)
const Layout = ({ children }) => {
  const location = useLocation();
  const showFooter =
    location.pathname === "/" || location.pathname === "/marketplace";

  return (
    <>
      <ThreeJSBackground />
      <Header />
      {children}
      {showFooter && <Footer />} {/* ✅ Footer only for Home & Marketplace */}
    </>
  );
};

const App = () => {
  return (
    <Layout>
      <Suspense fallback={<div className="text-center mt-5">Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/register" element={<AuthForm />} />
          <Route path="/login" element={<Login />} />
          <Route path="/marketplace" element={<FarmMarketplace />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/admin" element={<AdminDashboard />} />{" "}
          {/* ✅ Lazy Loaded */}
        </Routes>
      </Suspense>
    </Layout>
  );
};

export default App;
