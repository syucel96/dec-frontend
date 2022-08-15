import React, { forwardRef } from "react";
import rhs from '../media/green-bg.png';

function About(props, ref) {
  return (
    <div ref={ref}>
      <div className="about-section">
        <div className="about-container">
          <h2 className="about-subheader">WHO WE ARE</h2>
          <p className="about-paragraph">
            Digital Eyes Capital is an investment firm providing active exposure
            to disproportionate growth in the crypto asset class by investing in blockchain companies.
          </p>
          <h2 className="about-subheader">OUR THESIS</h2>
          <p className="about-paragraph">
            Blockchain technology and Decentralized Finance unlock superior
            capital efficiency.
          </p>
          <h2 className="about-subheader">HOW WE DO IT</h2>
          <p className="about-paragraph">
            We invest in blockchain projects after extensive analysis, then we aggressively participate in liquidity provision on blockchain
            protocols to provide the most fluid, active and fertile integration
            of our customers’ investment into the digital economy.
          </p>
        </div>
        <div className="about-bg-wrapper">
            <img src={rhs} alt="green" className="about-bg"/>
        </div>
      </div>
    </div>
  );
}

export default forwardRef(About);
