import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
// import "./Qrscanned.css";

function Qrscanned() {
  const { id } = useParams(); // Get product ID from URL
  const [product, setProduct] = useState(null);

  // Simulating fetching product details (Replace with actual API call)
  useEffect(() => {
    const fakeProducts = [
      {
        id: 1,
        name: "Organic Tomatoes",
        price: "₹50/kg",
        farmer: "Ramesh Kumar",
        origin: "Punjab",
        description: "Fresh organic tomatoes directly from the farm.",
      },
      {
        id: 2,
        name: "Pure Honey",
        price: "₹300/bottle",
        farmer: "Suresh Patel",
        origin: "Himachal Pradesh",
        description: "100% natural honey sourced from the Himalayas.",
      },
      {
        id: 3,
        name: "Basmati Rice",
        price: "₹90/kg",
        farmer: "Anil Sharma",
        origin: "Uttar Pradesh",
        description: "Premium quality Basmati rice with a rich aroma.",
      },
    ];

    const foundProduct = fakeProducts.find((p) => p.id === parseInt(id));
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [id]);

  if (!product) {
    return <div className="loading">Loading product details...</div>;
  }

  return (
    <div className="product-page">
      <div className="product-card">
        <h1 className="product-name">{product.name}</h1>
        <p className="product-detail">
          <strong>Price:</strong> {product.price}
        </p>
        <p className="product-detail">
          <strong>Farmer:</strong> {product.farmer}
        </p>
        <p className="product-detail">
          <strong>Origin:</strong> {product.origin}
        </p>
        <p className="product-desc">{product.description}</p>
      </div>
      <style>
        {`/* Full-screen centered layout */
.product-page {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    background: linear-gradient(to right, #28a745, #ffffff);
    padding: 20px;
  }
  
  /* Product Card */
  .product-card {
    background: white;
    padding: 30px;
    border-radius: 12px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.3);
    text-align: center;
    max-width: 400px;
    width: 100%;
    transition: transform 0.3s ease-in-out;
  }
  
  .product-card:hover {
    transform: scale(1.05);
  }
  
  /* Product Name */
  .product-name {
    font-size: 24px;
    color: #28a745;
    margin-bottom: 10px;
  }
  
  /* Product Details */
  .product-detail {
    font-size: 18px;
    margin: 5px 0;
    color: #333;
  }
  
  /* Product Description */
  .product-desc {
    font-size: 16px;
    color: #666;
    margin-top: 15px;
  }
  
  /* Loading State */
  .loading {
    font-size: 20px;
    text-align: center;
    margin-top: 50px;
  }
  `}
      </style>
    </div>
  );
}

export default Qrscanned;
