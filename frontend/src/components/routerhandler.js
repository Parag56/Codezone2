import React,{useState,useCallback} from "react";
import MainPage from "./Mainpage/Mainpage";
import EditorPage from "./EditorPage/Editor";
import { BrowserRouter as Router, Switch, Route, Redirect } from "react-router-dom";
import { AuthContext } from "./Context/Auth-context";
function Routerhandler() {
    const [isloggedin,setisloggedin]=useState(false)
    const login=useCallback(()=>{
        setisloggedin(true)
    })
    const logout=useCallback(()=>{
        setisloggedin(false)
    })
  return (
    <AuthContext.Provider value={{isloggedin:isloggedin,login:login,logout:logout}}>
      <Router>
        <Switch>
          <Route exact path="/">
            <MainPage />
          </Route>
          <Route exact path="/editor/:uid">
            <EditorPage />
          </Route>
          <Redirect to="/" />
        </Switch>
      </Router>
    </AuthContext.Provider>
  );
}

export default Routerhandler;
