import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, Users, Package, ShoppingCart, FileText, Menu, X } from "lucide-react";

const AdminSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  // Function to toggle sidebar on mobile
  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <>
      {/* Mobile Sidebar Toggle Button */}
      <button className="d-md-none btn btn-light position-fixed top-0 start-0 m-3" onClick={toggleSidebar}>
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside className={`admin-sidebar ${isOpen ? "open" : ""} d-flex flex-column vh-100`}
        style={{ width: isOpen ? "250px" : "0", background: "#f1fdf6", color: "black", overflow: "hidden", transition: "width 0.3s ease-in-out" }}>
        
        {/* Close Button on Mobile */}
        <button className="d-md-none btn btn-light position-absolute top-0 end-0 m-3" onClick={toggleSidebar}>
          <X size={24} />
        </button>

        <h3 className="mb-4 text-center">Verified Natural</h3>

        <ul className="nav flex-column">
          <li className={`nav-item ${location.pathname === "/admin" ? "active" : ""}`}>
            <Link to="/admin" className="nav-link d-flex align-items-center" onClick={toggleSidebar}>
              <Home size={18} className="me-2" /> Dashboard
            </Link>
          </li>
          <li className={`nav-item ${location.pathname.includes("/admin/verifications") ? "active" : ""}`}>
            <Link to="/admin/verifications" className="nav-link d-flex align-items-center" onClick={toggleSidebar}>
              <Users size={18} className="me-2" /> Farmer Verification
            </Link>
          </li>
          <li className={`nav-item ${location.pathname.includes("/admin/products") ? "active" : ""}`}>
            <Link to="/admin/products" className="nav-link d-flex align-items-center" onClick={toggleSidebar}>
              <Package size={18} className="me-2" /> Products
            </Link>
          </li>
          <li className={`nav-item ${location.pathname.includes("/admin/orders") ? "active" : ""}`}>
            <Link to="/admin/orders" className="nav-link d-flex align-items-center" onClick={toggleSidebar}>
              <ShoppingCart size={18} className="me-2" /> Orders
            </Link>
          </li>
          <li className={`nav-item ${location.pathname.includes("/admin/reports") ? "active" : ""}`}>
            <Link to="/admin/reports" className="nav-link d-flex align-items-center" onClick={toggleSidebar}>
              <FileText size={18} className="me-2" /> Reports
            </Link>
          </li>
        </ul>
      </aside>

      {/* Sidebar Styles */}
      <style>
        {`
          .admin-sidebar {
            position: fixed;
            left: 0;
            top: 0;
            height: 100vh;
            z-index: 1050;
          }

          .admin-sidebar ul .nav-item.active {
            background: #01c64b;
            border-radius: 5px;
          }

          .admin-sidebar ul .nav-item.active a {
            color: white;
          }

          @media (max-width: 768px) {
            .admin-sidebar {
              width: 0;
              position: fixed;
              height: 100vh;
              z-index: 1050;
              overflow-x: hidden;
            }

            .admin-sidebar.open {
              width: 250px;
            }
          }
        `}
      </style>
    </>
  );
};

export default AdminSidebar;
