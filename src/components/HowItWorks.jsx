import React from 'react';

const HowItWorks = () => {
  const steps = [
    { number: 1, title: "Farmer Certification", description: "Natural farmers apply and undergo our verification process to receive digital certification." },
    { number: 2, title: "Product Tracking", description: "Each harvest is recorded and assigned a unique QR code containing its complete history." },
    { number: 3, title: "Marketplace Listing", description: "Certified products are listed on our platform with transparent pricing and details." },
    { number: 4, title: "Consumer Connection", description: "Consumers purchase directly from farmers and can verify authenticity through QR scanning." }
  ];

  return (
    <section className="container my-5" id="how-it-works">
      <h2 className="text-center mb-4" style={{color:"#01c64b"}}>How HarvestTrace Works</h2>
      <div className="row">
        {steps.map((step) => (
          <div key={step.number} className="col-md-3 text-center mb-4">
            <div className=" text-white rounded-circle d-flex align-items-center justify-content-center" style={{ width: '80px', height: '80px', margin: '0 auto', background:"#01c64b" }}>
              <h3>{step.number}</h3>
            </div>
            <h5 className="mt-2" style={{color:"#01c64b"}}>{step.title}</h5>
            <p>{step.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;