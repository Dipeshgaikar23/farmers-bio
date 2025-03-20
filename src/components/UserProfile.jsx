import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaUserCircle,
  FaThLarge,
  FaHeart,
  FaCcVisa,
  FaCcMastercard,
  FaHome,
  FaBriefcase,
  FaPencilAlt,
  FaTrash,
} from "react-icons/fa";
import { motion } from "framer-motion";

const ProfileCard = () => (
  <motion.div
    className="card p-3 bg-light"
    whileHover={{ scale: 1.05, transition: { ease: "easeOut", duration: 0.3 } }}
  >
    <div className="d-flex align-items-center">
      <FaUserCircle size={40} className="text-success me-3" />
      <div>
        <h5 className="mb-0">Sarah Johnson</h5>
        <small className="text-muted">Member since: Jan 2023</small>
      </div>
    </div>
    <div className="mt-3 d-flex gap-2">
      <button className="btn btn-success">Edit Profile</button>
      <button className="btn btn-outline-secondary">Change Photo</button>
    </div>
  </motion.div>
);

const NavigationCard = () => (
  <motion.div
    className="card p-3 bg-light"
    whileHover={{ scale: 1.05, transition: { ease: "easeOut", duration: 0.3 } }}
  >
    <div className="d-flex align-items-center">
      <FaThLarge size={40} className="text-success me-3" />
      <div>
        <h5 className="mb-0">Account Navigation</h5>
        <small className="text-muted">
          Manage your account settings and preferences
        </small>
      </div>
    </div>
  </motion.div>
);

const ShoppingCartItem = ({ image, title, description }) => (
  <motion.div
    className="d-flex justify-content-between align-items-center p-2 border-bottom"
    whileHover={{ scale: 1.02 }}
  >
    <div className="d-flex align-items-center">
      <img
        src={image}
        alt={title}
        className="rounded-circle me-3"
        width={50}
        height={50}
      />
      <div>
        <h6 className="mb-0">{title}</h6>
        <small className="text-muted">{description}</small>
      </div>
    </div>
    <div className="d-flex gap-2">
      <FaHeart className="text-danger" />
      <button className="btn btn-sm btn-outline-secondary">Order Now</button>
    </div>
  </motion.div>
);

const OrderSummary = () => (
  <motion.div
    className="card p-3 bg-success text-white"
    whileHover={{ scale: 1.05 }}
  >
    <h5>Order Summary</h5>
    <p className="mb-1">Subtotal: &#x20B9;22.47</p>
    <p className="mb-1">Delivery: &#x20B9;3.99</p>
    <p className="mb-1">Platform fee: &#x20B9;3.99</p>
    <p className="mb-1">CGST: &#x20B9;2.65</p>
    <p className="mb-1">SGST: &#x20B9;2.65</p>
    <p className="fw-bold">Total: &#x20B9;29.11</p>
    <div className="mt-3 d-flex gap-2">
      <button className="btn btn-light">Checkout</button>
      <button className="btn btn-outline-light">Continue Shopping</button>
    </div>
  </motion.div>
);

const PaymentMethods = () => (
  <motion.div className="card p-3" whileHover={{ scale: 1.05 }}>
    <h5>Saved Payment Methods</h5>
    <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
      <div className="d-flex align-items-center">
        <FaCcVisa size={30} className="text-primary me-3" />
        <div>
          <p className="mb-0">Visa ending in 4242</p>
          <small className="text-muted">Expires 05/25</small>
        </div>
      </div>
      <div className="d-flex gap-2">
        <FaPencilAlt className="text-secondary" />
        <FaTrash className="text-danger" />
      </div>
    </div>
    <button className="btn btn-success mt-3">Add New Payment Method</button>
  </motion.div>
);

const DeliveryAddresses = () => (
  <motion.div className="card p-3" whileHover={{ scale: 1.05 }}>
    <h5>Delivery Addresses</h5>
    <div className="d-flex justify-content-between align-items-center border-bottom pb-2">
      <div className="d-flex align-items-center">
        <FaHome size={30} className="text-secondary me-3" />
        <div>
          <p className="mb-0">Home</p>
          <small className="text-muted">
            123 Main St, Apt 4B, Portland, OR 97201
          </small>
        </div>
      </div>
      <div className="d-flex gap-2">
        <FaPencilAlt className="text-secondary" />
        <FaTrash className="text-danger" />
      </div>
    </div>
    <button className="btn btn-success mt-3">Add New Address</button>
  </motion.div>
);

const OurOrders = () => (
  <motion.div className="card p-3" whileHover={{ scale: 1.05 }}>
    <h5>Your Orders</h5>
    <ShoppingCartItem
      image="https://via.placeholder.com/50"
      title="Organic Bananas"
      description="&#x20B9;2.99/bunch - Delivered"
    />
    <ShoppingCartItem
      image="https://via.placeholder.com/50"
      title="Almond Milk"
      description="&#x20B9;3.50/carton - Delivered"
    />
    <ShoppingCartItem
      image="https://via.placeholder.com/50"
      title="Whole Grain Bread"
      description="&#x20B9;4.20/loaf - Delivered"
    />
  </motion.div>
);

const UserProfile = () => {
  return (
    <div className="container py-4 " style={{ marginTop: "8rem" }}>
      <div className="row mb-3">
        <div className="col-md-6">
          <ProfileCard />
        </div>
        <div className="col-md-6">
          <NavigationCard />
        </div>
      </div>
      <div className="card p-3">
        <h5>Your Shopping Cart (3 items)</h5>
        <ShoppingCartItem
          image="https://via.placeholder.com/50"
          title="Organic Tomatoes"
          description="&#x20B9;4.99/lb - Qty: 2"
        />
        <ShoppingCartItem
          image="https://via.placeholder.com/50"
          title="Fresh Strawberries"
          description="&#x20B9;5.99/basket - Qty: 1"
        />
        <ShoppingCartItem
          image="https://via.placeholder.com/50"
          title="Free-Range Eggs"
          description="&#x20B9;6.50/dozen - Qty: 1"
        />
      </div>
      <div className="mt-3">
        <OurOrders />
      </div>
      <div className="mt-3">
        <OrderSummary />
      </div>
      <div className="mt-3">
        <PaymentMethods />
      </div>
      <div className="mt-3">
        <DeliveryAddresses />
      </div>
    </div>
  );
};

export default UserProfile;
