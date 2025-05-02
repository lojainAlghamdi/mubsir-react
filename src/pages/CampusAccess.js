import React from "react";
import "../styles.css";

export default function CampusAccess({ buildings }) {
  return (
    <section className="campus-access py-5">
      <div className="container">
        <h2 className="text-center mb-5">Access To University Buildings</h2>
        <div className="row">
          {buildings.map((card, i) => (
            <div className="col-md-4 mb-4" key={i}>
              <div className="campus-card">
                <img src={card.image} alt={card.title} className="card-image" />
                <div className="card-overlay">
                  <h5>{card.title}</h5>
                  <p>{card.description}</p>
                  <a
                    href={card.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-light btn-sm mt-2"
                  >
                    Go to the destination
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}