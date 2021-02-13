import React from "react";
import MainPage from "./Mainpage/Mainpage";
import EditorPage from "./EditorPage/Editor";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import About from "./AboutPage/About";
import Userpanel from "./userPanel/Userpanel";
function Routerhandler() {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <MainPage />
        </Route>
        <Route exact path="/aboutus">
          <About />
        </Route>
        <Route exact path="/editor/:uid">
          <EditorPage />
        </Route>
        <Route exact path="/mypage">
          <Userpanel />
        </Route>
      </Switch>
    </Router>
  );
}

export default Routerhandler;