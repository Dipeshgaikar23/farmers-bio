import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate } from "react-router-dom";

const FarmerDashboard = () => {
  const navigate = useNavigate();

  return (
    <div className="container mt-4">
      {/* Dashboard Header */}
      <h1 className="text-center">Farmer Dashboard</h1>
      <div className="d-flex justify-content-center flex-wrap">
        {[
          {
            title: "PRODUCTS",
            text: "24 Active products in your inventory",
            btn: "View All",
          },
          {
            title: "ORDERS",
            text: "12 New orders awaiting fulfillment",
            btn: "Process Orders",
          },
          {
            title: "SALES",
            text: "$1,245 Revenue this month",
            btn: "View Report",
          },
          {
            title: "RATING",
            text: "4.8/5 Average customer satisfaction",
            btn: "See Reviews",
          },
        ].map((card, index) => (
          <div
            key={index}
            className="card text-center p-3 m-2 shadow"
            style={{ width: "18rem" }}
          >
            <h3>{card.title}</h3>
            <p>{card.text}</p>
            <button className="btn btn-success">{card.btn}</button>
          </div>
        ))}
      </div>

      {/* Navigation */}
      <nav className="mt-4">
        <strong>Dashboard</strong> &gt; Products &gt; Orders &gt; Analytics &gt;
        Profile
      </nav>

      {/* Product Table */}
      <div className="mt-4">
        <h2>Your Products</h2>
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Search products..."
        />
        <button className="btn btn-primary mb-3">Add New Product</button>
        <table className="table table-bordered">
          <thead className="table-light">
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Category</th>
              <th>Stock</th>
              <th>Price</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              [
                "#1001",
                "Organic Tomatoes",
                "Vegetables",
                "45 kg",
                "$3.99/kg",
                "Active",
              ],
              [
                "#1002",
                "Fresh Eggs",
                "Dairy",
                "120 units",
                "$4.50/dozen",
                "Active",
              ],
              [
                "#1003",
                "Honey",
                "Specialty",
                "25 jars",
                "$8.99/jar",
                "Low Stock",
              ],
              [
                "#1004",
                "Organic Apples",
                "Fruits",
                "60 kg",
                "$2.49/kg",
                "Active",
              ],
              [
                "#1005",
                "Fresh Milk",
                "Dairy",
                "35 liters",
                "$3.25/liter",
                "Active",
              ],
            ].map((row, index) => (
              <tr key={index}>
                {row.map((cell, i) => (
                  <td key={i}>{cell}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Recent Orders */}
      <div className="mt-4">
        <h4>Recent Orders</h4>
        {[
          "Order #5432 - John Smith - $78.50 - 2 hours ago",
          "Order #5431 - Maria Garcia - $45.25 - 5 hours ago",
          "Order #5430 - Robert Johnson - $124.99 - Yesterday",
        ].map((order, index) => (
          <p key={index}>{order}</p>
        ))}
      </div>

      {/* Sales Analytics */}
      <div className="mt-4">
        <h4>Sales Analytics</h4>
        {[
          {
            title: "Top Selling",
            text: "Organic Tomatoes, Fresh Eggs, Honey",
            btn: "View Details",
          },
          {
            title: "Monthly Sales",
            text: "Chart showing sales growth over past 6 months",
            btn: "View Full Chart",
          },
          {
            title: "Total Sales",
            text: "$15,780 revenue with 22% increase YoY",
            btn: "See Breakdown",
          },
        ].map((data, index) => (
          <div key={index} className="mt-2">
            <h5>{data.title}</h5>
            <p>{data.text}</p>
            <button className="btn btn-secondary">{data.btn}</button>
          </div>
        ))}
      </div>
    </div>
  );
};

const FarmerProfile = () => {
  const [formData, setFormData] = useState({
    firstName: "John",
    lastName: "Farmer",
    email: "john.farmer@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Harvest Lane, Farmville, CA 95432",
    description:
      "Sustainable family farm specializing in organic vegetables, free-range eggs, and artisanal honey. Practicing regenerative agriculture since 2010.",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="container mt-4">
      {/* Breadcrumb Navigation */}
      <nav className="breadcrumb">
        <a href="#">Dashboard</a> &gt; <span>Profile</span>
      </nav>

      <h1>Farmer Profile</h1>

      {/* Profile Sections */}
      <div className="row">
        {[
          "Personal Information",
          "Account Security",
          "Payment Methods",
          "Preferences",
        ].map((section, index) => (
          <div key={index} className="col-md-3 mb-3">
            <div className="card p-3 shadow-sm">
              <h4>{section}</h4>
              <p>Manage your {section.toLowerCase()}</p>
              <button className="btn btn-primary">
                {index === 0 ? "Edit" : "Manage"}
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Personal Information Form */}
      <section className="mt-4">
        <h2>Personal Information</h2>
        <form className="row g-3">
          {Object.keys(formData).map((key) => (
            <div className="col-md-6" key={key}>
              <label className="form-label">
                {key
                  .replace(/([A-Z])/g, " $1")
                  .replace(/^./, (str) => str.toUpperCase())}
                :
              </label>
              {key === "description" ? (
                <textarea
                  className="form-control"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                />
              ) : (
                <input
                  type={key === "email" ? "email" : "text"}
                  className="form-control"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                />
              )}
            </div>
          ))}
          <div className="col-12">
            <button type="submit" className="btn btn-success me-2">
              Save Changes
            </button>
            <button type="button" className="btn btn-secondary">
              Cancel
            </button>
          </div>
        </form>
      </section>

      {/* Farm Certifications */}
      <section className="mt-4">
        <h2>Farm Certifications</h2>
        <ul className="list-group">
          {[
            "USDA Organic Certification",
            "Non-GMO Project Verified",
            "Certified Humane",
          ].map((cert, index) => (
            <li
              key={index}
              className="list-group-item d-flex justify-content-between align-items-center"
            >
              {cert}
              <button className="btn btn-outline-primary btn-sm">Edit</button>
            </li>
          ))}
        </ul>
        <button className="btn btn-primary mt-3">Add New Certification</button>
      </section>
    </div>
  );
};

export default FarmerDashboard;
