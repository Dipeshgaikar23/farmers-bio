import React, { useState, useEffect } from "react";
import { Users, Package, ShoppingCart, Award, Eye, MoreVertical, Download } from "lucide-react";
import AdminSidebar from "./AdminSidebar";

const AdminDashboard = () => {
  const [dashboardStats, setDashboardStats] = useState(null);
  const [verifications, setVerifications] = useState([]);
  const [qrCodes, setQRCodes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);

        // ✅ No API, just mock data
        setDashboardStats({
          verified_farmers: 156,
          active_products: 432,
          pending_orders: 89,
          certification_requests: 42,
        });

        setVerifications([
          { id: 1, farmerName: "Rajesh Kumar", product: "Organic Rice", location: "Karnataka", submitted: "05/12/2023", status: "Pending" },
          { id: 2, farmerName: "Anita Sharma", product: "Natural Vegetables", location: "Maharashtra", submitted: "05/10/2023", status: "Pending" },
          { id: 3, farmerName: "Prakash Singh", product: "Millet Farming", location: "Tamil Nadu", submitted: "05/08/2023", status: "Pending" },
        ]);

        setQRCodes([
          { id: 1, productName: "Organic Rice - 5kg Package", farmerName: "Rajesh Kumar", generatedAt: "05/12/2023" },
          { id: 2, productName: "Natural Vegetables Basket", farmerName: "Anita Sharma", generatedAt: "05/11/2023" },
        ]);

      } catch (error) {
        console.error("Dashboard Error:", error);
        setError("Failed to load data.");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  if (loading) return <div className="text-center mt-5">Loading...</div>;
  if (error) return <div className="text-center text-danger mt-5">{error}</div>;

  return (
    <div className="d-flex" >
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content */}
      <div className="flex-grow-1 p-4" style={{marginTop:"10vh"}}>
        <h2 className="fw-bold text-dark mb-4">Dashboard Overview</h2>

        {/* Dashboard Stats Cards */}
        <div className="row g-4 mb-4">
          {[
            { label: "Verified Farmers", value: dashboardStats?.verified_farmers || 0, icon: <Users size={32} />, color: "#01c64b" },
            { label: "Active Products", value: dashboardStats?.active_products || 0, icon: <Package size={32} />, color: "#007bff" },
            { label: "Pending Orders", value: dashboardStats?.pending_orders || 0, icon: <ShoppingCart size={32} />, color: "#ffc107" },
            { label: "Certification Requests", value: dashboardStats?.certification_requests || 0, icon: <Award size={32} />, color: "#17a2b8" },
          ].map((stat, index) => (
            <div className="col-lg-3 col-md-6" key={index}>
              <div className="card shadow-sm border-0 text-white p-4 rounded-3" style={{ background: stat.color }}>
                <div className="d-flex justify-content-between align-items-center">
                  <div>
                    <p className="small mb-1">{stat.label}</p>
                    <h3 className="fw-bold">{stat.value}</h3>
                  </div>
                  {stat.icon}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Pending Verifications Table */}
        <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
          <h3 className="fw-bold text-dark mb-3">Pending Verifications</h3>
          <div className="table-responsive">
            <table className="table">
              <thead className="bg-light">
                <tr>
                  <th>Farmer Name</th>
                  <th>Product</th>
                  <th>Location</th>
                  <th>Submitted Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {verifications.map((verification) => (
                  <tr key={verification.id}>
                    <td>{verification.farmerName}</td>
                    <td>{verification.product}</td>
                    <td>{verification.location}</td>
                    <td>{verification.submitted}</td>
                    <td>
                      <span className="badge bg-warning">{verification.status}</span>
                    </td>
                    <td>
                      <button className="btn btn-outline-dark btn-sm me-2"><Eye size={16} /></button>
                      <button className="btn btn-outline-dark btn-sm"><MoreVertical size={16} /></button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* QR Code Generations */}
        <div className="bg-white rounded-3 shadow-sm p-4 mb-4">
          <h3 className="fw-bold text-dark mb-3">Recent QR Code Generations</h3>
          <ul className="list-group">
            {qrCodes.map((qr) => (
              <li key={qr.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <p className="mb-1 fw-bold">{qr.productName}</p>
                  <small>Generated: {qr.generatedAt} | Farmer: {qr.farmerName}</small>
                </div>
                <button className="btn btn-outline-dark btn-sm"><Download size={16} /></button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
