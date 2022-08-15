import React, { createRef } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./style/App.css";
import ModalSwitch from "./components/ModalSwitch";

function App() {
  var refPortfolio = createRef();
  var refTeam = createRef();
  var refAbout = createRef();
  var refContact = createRef();

  const scrollToSection = (section) => {
    if (section === false) {
      refPortfolio.current.scrollIntoView({ behavior: "smooth" });
    } else {
      refContact.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  window.addEventListener('resize', () => {
    // We execute the same script as before
    let vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', `${vh}px`);
  });

  return (
    <>
      <Router >
        <Navbar
          refPortfolio={refPortfolio}
          refTeam={refTeam}
          refContact={refContact}
          refAbout={refAbout}
        />
        <ModalSwitch refPortfolio={refPortfolio} refAbout={refAbout} refTeam={refTeam} refContact={refContact} scrollToSection={scrollToSection} />
        <Footer/>
      </Router>
    </>
  );
}

export default App;
