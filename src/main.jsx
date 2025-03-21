import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom"; // Import BrowserRouter
import App from "./App";
import "bootstrap/dist/css/bootstrap.min.css";
import FarmerDashboard from "./components/FarmerDashboard";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
      {/* <FarmerDashboard></FarmerDashboard> */}
    </BrowserRouter>
  </React.StrictMode>
);
