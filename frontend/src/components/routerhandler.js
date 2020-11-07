import React from 'react'
import MainPage from './Mainpage/Mainpage'
import EditorPage from './EditorPage/Editor'

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
function Routerhandler() {
    return (
        <Router>
            <Switch>
                
                <Route exact path="/"><MainPage/></Route>
                <Route exact path="/editor/:uid"><EditorPage/></Route>
            </Switch>
        </Router>
    )
}

export default Routerhandler
