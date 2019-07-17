import React from 'react';
import { HashRouter as Router, Switch } from "react-router-dom";
import { config } from './config'
import RouterAuth from './router'
import 'antd/dist/antd.css';
export default () => {
    return (
        <Router>
            <Switch>
                <RouterAuth config={config}></RouterAuth>
            </Switch>
        </Router>
    )
}

