import React, { useState, useEffect } from "react";
import { Carousel } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

const Cart = () => {
  // Product data with multiple images for carousel
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Organic Tomatoes",
      size: "1 kg",
      seller: "FreshFarm",
      verified: true,
      price: 120,
      originalPrice: 499,
      discount: "75% off",
      offersAvailable: 2,
      deliveryBy: "Tomorrow",
      images: [
        "/api/placeholder/150/150",
        "/api/placeholder/150/150",
        "/api/placeholder/150/150",
      ],
    },
    {
      id: 2,
      name: "Farm Fresh Eggs",
      size: "12 pcs",
      seller: "CountryEggs",
      verified: true,
      price: 150,
      originalPrice: 299,
      discount: "50% off",
      offersAvailable: 1,
      deliveryBy: "Tomorrow",
      images: [
        "/api/placeholder/150/150",
        "/api/placeholder/150/150",
        "/api/placeholder/150/150",
      ],
    },
  ]);

  // Dynamic calculation of price details
  const calculatePriceDetails = () => {
    const totalOriginalPrice = cartItems.reduce(
      (total, item) => total + item.originalPrice,
      0
    );
    const totalDiscountedPrice = cartItems.reduce(
      (total, item) => total + item.price,
      0
    );
    const totalDiscount = totalOriginalPrice - totalDiscountedPrice;
    const platformFee = 5;
    const deliveryCharges = 0; // FREE
    const totalAmount = totalDiscountedPrice + platformFee + deliveryCharges;
    const totalSavings = totalDiscount;

    return {
      originalPrice: totalOriginalPrice,
      discountedPrice: totalDiscountedPrice,
      discount: totalDiscount,
      platformFee,
      deliveryCharges,
      totalAmount,
      totalSavings,
    };
  };

  // Calculate price details
  const priceDetails = calculatePriceDetails();

  // Function to handle quantity change
  const handleQuantityChange = (id, increment) => {
    setCartItems(
      cartItems.map((item) => {
        if (item.id === id) {
          const newPrice = increment
            ? (item.price / item.quantity) * (item.quantity + 1)
            : (item.price / item.quantity) * Math.max(1, item.quantity - 1);

          const newOriginalPrice = increment
            ? (item.originalPrice / item.quantity) * (item.quantity + 1)
            : (item.originalPrice / item.quantity) *
              Math.max(1, item.quantity - 1);

          return {
            ...item,
            quantity: increment
              ? (item.quantity || 1) + 1
              : Math.max(1, (item.quantity || 1) - 1),
            price: Math.round(newPrice),
            originalPrice: Math.round(newOriginalPrice),
          };
        }
        return item;
      })
    );
  };

  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter((item) => item.id !== id));
  };

  // Main container style with fixed 90% width and centered
  const mainContainerStyle = {
    width: "90%",
    maxWidth: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    padding: "0",
    boxSizing: "border-box",
    marginTop: "8rem",
  };

  const navigate = useNavigate();
  return (
    <div style={mainContainerStyle} className="container">
      <div className="row my-3">
        <div className="col-12">
          <h2 className="text-success">My Cart ({cartItems.length})</h2>
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          {/* Delivery Address */}
          <div className="card mb-3">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <strong>Deliver to: John Doe, 421503</strong>
                  <div>123 Farm Lane, Green Garden, Farmville</div>
                </div>
                <button className="btn btn-outline-success">Change</button>
              </div>
            </div>
          </div>

          {/* Cart Items */}
          {cartItems.map((item) => (
            <div className="card mb-3" key={item.id}>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-3">
                    <Carousel
                      interval={2000}
                      controls={false}
                      indicators={true}
                    >
                      {item.images.map((img, index) => (
                        <Carousel.Item key={index}>
                          <img
                            className="d-block w-100"
                            src={img}
                            alt={`${item.name} - image ${index + 1}`}
                          />
                        </Carousel.Item>
                      ))}
                    </Carousel>
                  </div>
                  <div className="col-md-9">
                    <h5>{item.name}</h5>
                    <p className="mb-1">Size: {item.size}</p>
                    <p className="mb-2">
                      Seller: {item.seller}
                      {item.verified && (
                        <span className="badge bg-success text-white ms-2">
                          Verified
                        </span>
                      )}
                    </p>
                    <div className="d-flex align-items-center mb-2">
                      <button
                        className="btn btn-sm btn-outline-secondary me-2"
                        onClick={() => handleQuantityChange(item.id, false)}
                      >
                        −
                      </button>
                      <span className="border px-3 py-1">
                        {item.quantity || 1}
                      </span>
                      <button
                        className="btn btn-sm btn-outline-secondary ms-2"
                        onClick={() => handleQuantityChange(item.id, true)}
                      >
                        +
                      </button>
                    </div>
                    <div className="d-flex align-items-center">
                      <h6 className="mb-0 me-2">₹{item.price}</h6>
                      <span className="text-decoration-line-through text-muted me-2">
                        ₹{item.originalPrice}
                      </span>
                      <span className="text-success">{item.discount}</span>
                      <span className="badge bg-success text-white ms-2">
                        {item.offersAvailable} offers available
                      </span>
                    </div>
                    <div className="mt-2">
                      <span className="text-success">
                        <i className="bi bi-check-circle-fill me-1"></i>
                        Delivery by {item.deliveryBy}
                      </span>
                      <div className="mt-2">
                        <button
                          className="btn btn-sm btn-outline-danger me-2"
                          onClick={() => removeItem(item.id)}
                        >
                          <i className="bi bi-trash me-1"></i> REMOVE
                        </button>
                        <button className="btn btn-sm btn-outline-success">
                          <i className="bi bi-heart me-1"></i> SAVE FOR LATER
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="col-lg-4">
          {/* Price Details */}
          <div className="card">
            <div className="card-header bg-white">
              <h5 className="mb-0">PRICE DETAILS</h5>
            </div>
            <div className="card-body">
              <div className="d-flex justify-content-between mb-2">
                <span>Price ({cartItems.length} items)</span>
                <span>₹{priceDetails.originalPrice}</span>
              </div>
              <div className="d-flex justify-content-between mb-2 text-success">
                <span>Discount</span>
                <span>− ₹{priceDetails.discount}</span>
              </div>
              <div className="d-flex justify-content-between mb-2">
                <span>Platform Fee</span>
                <span>₹{priceDetails.platformFee}</span>
              </div>
              <div className="d-flex justify-content-between mb-3">
                <span>Delivery Charges</span>
                <span className="text-success">FREE</span>
              </div>
              <hr />
              <div className="d-flex justify-content-between mb-2">
                <h6 className="mb-0">Total Amount</h6>
                <h6 className="mb-0">₹{priceDetails.totalAmount}</h6>
              </div>
              <hr />
              <div className="text-success mb-3">
                You will save ₹{priceDetails.totalSavings} on this order
              </div>

              <div className="card-body border rounded mb-3">
                <h6>Safe and Secure Payments</h6>
                <p className="text-muted mb-0">
                  <i className="bi bi-check-circle-fill text-success me-2"></i>
                  Easy returns. 100% Authentic products.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row mb-4">
        <div className="col-lg-8">
          <button
            onClick={() => navigate("/checkout")}
            className="btn btn-success w-100 py-2"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
