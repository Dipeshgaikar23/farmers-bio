import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaCheckCircle,
  FaReceipt,
  FaCalendarAlt,
  FaMoneyBillWave,
  FaMapMarkerAlt,
  FaTruck,
} from "react-icons/fa";
import "./Cart.css"; // Custom CSS for animations

const Cart = () => {
  return (
    <div
      className="container-fluid my-5 "
      style={{
        background: "rgba(255, 255, 255, 0.3)",
        backdropFilter: "blur(10px)",
      }}
    >
      <div className="d-flex mb-4 mt-12">
        <p>Home &gt; Account &gt; Checkout &gt; Payment &gt; Confirmation</p>
      </div>
      <h1 className="text-success fw-bold">Order Confirmed!</h1>
      <div>
        <OrderSuccess />
        <OrderDetails />
        <DeliveryInfo />
        <CashOnDelivery />
        <OrderSummary />
        <ActionButtons />
      </div>
    </div>
  );
};

const OrderSuccess = () => (
  <div className="p-4 bg-light rounded shadow-sm hover-effect box">
    <div className="d-flex align-items-center gap-2">
      <FaCheckCircle className="text-success fs-2" />
      <div>
        <h2 className="fs-5 fw-bold">Thank you for your order!</h2>
        <p>
          Your order #FRM-29845 has been placed successfully. You'll receive a
          confirmation email shortly.
        </p>
      </div>
    </div>
    <button className="btn btn-success mt-3 hover-button">Track Order</button>
  </div>
);

const OrderDetails = () => (
  <div className="mt-4 p-4 bg-light rounded shadow-sm hover-effect box">
    <h3 className="fw-bold">Order Details</h3>
    <div className="mt-2">
      {orderDetails.map((detail, index) => (
        <div key={index} className="d-flex align-items-center gap-2">
          {detail.icon}
          <p className="m-0">{detail.label}</p>
          <p className="fw-bold m-0">{detail.value}</p>
        </div>
      ))}
    </div>
  </div>
);

const DeliveryInfo = () => (
  <div className="mt-4 p-4 bg-light rounded shadow-sm hover-effect box">
    <h3 className="fw-bold">Delivery Information</h3>
    <div className="d-flex align-items-center gap-2">
      <FaTruck className="text-success fs-2" />
      <div>
        <h4 className="fs-6 fw-bold">Estimated Delivery</h4>
        <p>
          <span className="text-success fw-bold bg-light p-1 rounded">
            Your order is expected to arrive between May 17-18, 2023. You'll
            receive updates on your delivery status via email and SMS.
          </span>
        </p>
      </div>
    </div>
  </div>
);

const CashOnDelivery = () => (
  <div className="mt-4 p-4 bg-light rounded shadow-sm hover-effect box">
    <h3 className="fw-bold">Cash on Delivery Instructions</h3>
    <p>
      <span className="text-success fw-bold bg-light p-1 rounded">
        Please have the exact amount of ₹2,400 ready when your order arrives.
        Our delivery person will provide a receipt upon payment.
      </span>
    </p>
  </div>
);

const OrderSummary = () => (
  <div className="mt-4 p-4 bg-light rounded shadow-sm hover-effect box">
    <h3 className="fw-bold">Order Summary</h3>
    <div className="mt-2">
      {orderSummary.map((item, index) => (
        <div key={index} className="d-flex justify-content-between">
          <p>{item.label}</p>
          <p>{item.value}</p>
        </div>
      ))}
    </div>
  </div>
);

const ActionButtons = () => (
  <div className="mt-4 p-4 bg-light rounded shadow-sm hover-effect box d-flex gap-3">
    <button className="btn btn-success hover-button">Continue Shopping</button>
    <button className="btn btn-success hover-button">Download Invoice</button>
  </div>
);

const orderDetails = [
  {
    icon: <FaReceipt className="text-success" />,
    label: "Order Number",
    value: "FRM-29845",
  },
  {
    icon: <FaCalendarAlt className="text-success" />,
    label: "Order Date",
    value: "May 15, 2023 | 2:45 PM",
  },
  {
    icon: <FaMoneyBillWave className="text-success" />,
    label: "Payment Method",
    value: "Cash on Delivery",
  },
  {
    icon: <FaMapMarkerAlt className="text-success" />,
    label: "Delivery Address",
    value: "123 Main St, Apt 4B, Portland, OR 97201",
  },
];

const orderSummary = [
  { label: "Subtotal", value: "₹1,800" },
  { label: "Delivery", value: "₹200" },
  { label: "CGST", value: "₹100" },
  { label: "SGST", value: "₹100" },
  { label: "Platform Fee", value: "₹200" },
  { label: "Total", value: "₹2,400", isBold: true },
];

export default Cart;
