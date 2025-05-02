import React from "react";
import "../styles.css";

export default function Services({ services = []}) {
  return (
    <section className="services py-5">
      <div className="container">
        <h2 className="text-center mb-5">Our Services</h2>
        <div className="row" >
          {services.map((service, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="service-box">
                <img src={service.icon} alt={service.title} className="service-icon" />
                <h5>{service.title}</h5>
                <p>{service.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section> 
  );
}