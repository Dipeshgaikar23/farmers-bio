import React, { useRef, useEffect, useState } from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import BwipJs from "bwip-js";

const Invoice = () => {
  const invoiceRef = useRef();
  const barcodeRef = useRef();

  // Dynamic Data
  const [invoiceNumber] = useState(`INV-${new Date().getFullYear()}-001`);
  const [farmer, setFarmer] = useState({
    name: "John Doe",
    farm: "Green Valley Organic Farms",
    phone: "+91 98765 43210",
    address: "Village Road, Mumbai, Maharashtra",
  });

  const [buyer, setBuyer] = useState({
    name: "Jane Smith",
    phone: "+91 91234 56789",
    address: "12, Green Park, Delhi",
    paymentMode: "Online (UPI)",
  });

  const [products, setProducts] = useState([
    { id: 1, name: "Organic Apples (500gms)", qty: 5, price: 150 },
    { id: 2, name: "Fresh Cow Milk (1L)", qty: 2, price: 60 },
    { id: 3, name: "Pure Honey (500gms)", qty: 1, price: 250 },
  ]);

  const shippingCharge = 10;
  const platformFee = 3;

  // Calculate totals dynamically
  const subtotal = products.reduce(
    (total, item) => total + item.qty * item.price,
    0
  );
  const grandTotal = subtotal + shippingCharge + platformFee;

  useEffect(() => {
    if (barcodeRef.current) {
      try {
        const barcodeText = `Farmer: ${farmer.name} | Farm: ${farmer.farm} | Phone: ${farmer.phone} | Address: ${farmer.address}`;

        BwipJs.toCanvas(barcodeRef.current, {
          bcid: "code128", // Barcode type
          text: barcodeText, // Encode farmer details
          scale: 2.5, // Adjusted scale to fit container
          height: 18, // Reduced height for a compact look
          width: 150, // Fixed width to avoid overflow
          includetext: false, // Hide text under barcode
          textxalign: "center",
        });
      } catch (e) {
        console.error("Barcode Generation Error:", e);
      }
    }
  }, [farmer]);

  const downloadPDF = () => {
    const input = invoiceRef.current;
    const barcodeCanvas = barcodeRef.current;

    if (!barcodeCanvas) {
      console.error("Barcode canvas not found!");
      return;
    }

    const barcodeData = barcodeCanvas.toDataURL("image/png"); // Convert barcode to image

    html2canvas(input, { scale: 3 }).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const imgWidth = 210; // A4 width
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      // Add main invoice image
      pdf.addImage(imgData, "PNG", 0, 10, imgWidth, imgHeight);

      // Add barcode below the invoice
      pdf.addImage(barcodeData, "PNG", 80, imgHeight + 30, 50, 12); // Adjusted positioning & size

      pdf.save("invoice.pdf");
    });
  };

  return (
    <div className="invoice-container" style={{ marginTop: "8rem" }}>
      <div
        className="card shadow-lg p-3 border border-dark mx-auto"
        style={{ maxWidth: "60vw", width: "60%", minWidth: "500px" }}
        ref={invoiceRef}
      >
        {/* Invoice Header */}
        <div className="text-center mb-3">
          <h2 className="fw-bold text-uppercase" style={{ fontSize: "1.5rem" }}>
            Invoice
          </h2>
          <p className="text-muted" style={{ fontSize: "0.9rem" }}>
            <strong>Invoice No:</strong> {invoiceNumber}
          </p>
          <p style={{ fontSize: "0.9rem" }}>
            <strong>Date:</strong> {new Date().toLocaleDateString()}
          </p>
        </div>

        {/* Seller & Buyer Details */}
        <div className="row">
          <div className="col-md-6 mb-3">
            <h4 className="fw-semibold" style={{ fontSize: "1.2rem" }}>
              Seller Details
            </h4>
            <p style={{ fontSize: "0.9rem" }}>
              Farmer: <strong>{farmer.name}</strong>
            </p>
            <p style={{ fontSize: "0.9rem" }}>Farm: {farmer.farm}</p>
            <p style={{ fontSize: "0.9rem" }}>Phone: {farmer.phone}</p>
            <p style={{ fontSize: "0.9rem" }}>Address: {farmer.address}</p>
          </div>

          <div className="col-md-6 mb-3">
            <h4 className="fw-semibold" style={{ fontSize: "1.2rem" }}>
              Buyer Details
            </h4>
            <p style={{ fontSize: "0.9rem" }}>
              Name: <strong>{buyer.name}</strong>
            </p>
            <p style={{ fontSize: "0.9rem" }}>Phone: {buyer.phone}</p>
            <p style={{ fontSize: "0.9rem" }}>Address: {buyer.address}</p>
            <p style={{ fontSize: "0.9rem" }}>
              Payment Mode: {buyer.paymentMode}
            </p>
          </div>
        </div>
        <hr />

        {/* Product Table */}
        <div className="mt-3">
          <h4 className="fw-semibold" style={{ fontSize: "1.2rem" }}>
            Purchased Items
          </h4>
          <div className="table-responsive">
            <table className="table table-bordered text-center">
              <thead className="table-success">
                <tr>
                  <th style={{ fontSize: "0.9rem" }}>Sr.no</th>
                  <th style={{ fontSize: "0.9rem" }}>Item</th>
                  <th style={{ fontSize: "0.9rem" }}>Qty</th>
                  <th style={{ fontSize: "0.9rem" }}>Unit Price (₹)</th>
                  <th style={{ fontSize: "0.9rem" }}>Subtotal (₹)</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product, index) => (
                  <tr key={product.id}>
                    <td style={{ fontSize: "0.9rem" }}>{index + 1}</td>
                    <td style={{ fontSize: "0.9rem" }}>{product.name}</td>
                    <td style={{ fontSize: "0.9rem" }}>{product.qty}</td>
                    <td style={{ fontSize: "0.9rem" }}>₹{product.price}</td>
                    <td style={{ fontSize: "0.9rem" }}>
                      ₹{product.qty * product.price}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <hr />

        {/* Payment Summary */}
        <div className="mt-3">
          <h4 className="fw-semibold" style={{ fontSize: "1.2rem" }}>
            Payment Summary
          </h4>
          <p style={{ fontSize: "0.9rem" }}>
            <strong>Subtotal:</strong> ₹{subtotal}
          </p>
          <p style={{ fontSize: "0.9rem" }}>
            <strong>Shipping Charges:</strong> ₹{shippingCharge}
          </p>
          <p style={{ fontSize: "0.9rem" }}>
            <strong>Platform Fee:</strong> ₹{platformFee}
          </p>
          <h3 className="fw-bold text-primary" style={{ fontSize: "1.2rem" }}>
            Grand Total: ₹{grandTotal}
          </h3>
        </div>
        <hr />

        {/* Barcode - Now Properly Sized */}
        <div className="text-center mt-3">
          <h5 style={{ fontSize: "1rem" }}>Invoice Barcode</h5>
          <div className="d-flex justify-content-center">
            <canvas
              ref={barcodeRef}
              className="border border-dark p-2 bg-white"
              style={{ maxWidth: "100%", width: "200px", height: "50px" }} // Ensures barcode fits
            />
          </div>
        </div>
      </div>

      {/* Download Button */}
      <div className="text-center mt-4">
        <button className="btn btn-success px-4 py-2" onClick={downloadPDF}>
          Download Invoice (PDF)
        </button>
      </div>
      <style>
        {`.invoice-container{
                margin-top:'8rem';
            }`}
      </style>
    </div>
  );
};

export default Invoice;
