import React, { useState, useCallback, useEffect, Suspense } from "react";
import MainPage from "./Mainpage/Mainpage";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import { AuthContext } from "./Context/Auth-context";
import Loader from "./Loader/Loader";
import About from "./AboutPage/About";
const EditorPage = React.lazy(() => import("./EditorPage/Editor"));
let logouttimer;
function Routerhandler() {
  const [token, settoken] = useState(null);
  const [userid, setuserid] = useState(null);
  const [tokenexpirationdate, settokenexpirationdate] = useState();
  const login = useCallback((uid, token, expirationdate) => {
    settoken(token);
    setuserid(uid);
    const tokenexpirationdate =
      expirationdate || new Date(new Date().getTime() + 1000 * 60 * 60);
    settokenexpirationdate(tokenexpirationdate);
    localStorage.setItem(
      "userData",
      JSON.stringify({
        userId: uid,
        token: token,
        expiration: tokenexpirationdate.toISOString(),
      })
    );
  });
  const logout = useCallback(() => {
    settoken(null);
    setuserid(null);
    settokenexpirationdate(null);
    localStorage.removeItem("userData");
  });
  useEffect(() => {
    if (token && tokenexpirationdate) {
      const remainingtime =
        tokenexpirationdate.getTime() - new Date().getTime();
      logouttimer = setTimeout(logout, remainingtime);
    } else {
      clearTimeout(logouttimer);
    }
  }, [token, logout, tokenexpirationdate]);
  useEffect(() => {
    const storeddata = JSON.parse(localStorage.getItem("userData"));
    if (
      storeddata &&
      storeddata.token &&
      new Date(storeddata.expiration) > new Date()
    ) {
      login(
        storeddata.userId,
        storeddata.token,
        new Date(storeddata.expiration)
      );
    }
  }, []);
  return (
    <AuthContext.Provider
      value={{
        isloggedin: !!token,
        token: token,
        userid: userid,
        login: login,
        logout: logout,
      }}
    >
      <Router>
        <Suspense fallback={<Loader />}>
          <Switch>
            <Route exact path="/">
              <MainPage />
            </Route>
            <Route exact path="/about">
              <About />
            </Route>
            <Route exact path="/editor/:uid">
              <EditorPage />
            </Route>
            <Redirect to="/" />
          </Switch>
        </Suspense>
      </Router>
    </AuthContext.Provider>
  );
}

export default Routerhandler;
