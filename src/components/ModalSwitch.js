import React from "react";
import { Switch, Route, useLocation, Redirect } from "react-router-dom";
import { Home, NotFound } from "../pages";
import Modal from "./Modal";
import TeamModal from "./TeamModal";

function ModalSwitch({
  refPortfolio,
  refTeam,
  refAbout,
  refContact,
  scrollToSection,
}) {
  let location = useLocation();

  let background = location.state && location.state.background;
  return (
    <>
      <Switch location={background || location}>
        <Route
          path="/"
          exact
          children={
            <Home
              refPortfolio={refPortfolio}
              refTeam={refTeam}
              refAbout={refAbout}
              refContact={refContact}
              scrollToSection={scrollToSection}
            />
          }
        />
        <Route path="/404" children={<NotFound />} />
        <Redirect to="/404" />
      </Switch>

      {background && (
        <>
          <Route exact path="/portfolio/:id" children={<Modal />} />
          <Route exact path="/team/:id" children={<TeamModal />} />
        </>
      )}
    </>
  );
}

export default ModalSwitch;
