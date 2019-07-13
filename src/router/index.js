import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Home from '../views/Home'
import Login from '../views/Login'
import Register from '../views/Register'
import NotFound from '../views/NotFound'
import 'antd/dist/antd.css';
export default () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={Home}></Route>
                <Route path="/login" component={Login}></Route>
                <Route path="/register" component={Register}></Route>
                <Route component={NotFound}></Route>
            </Switch>
        </Router>
    )
}

