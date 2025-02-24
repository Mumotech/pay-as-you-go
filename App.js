/*
 * Copyright (c) 2025 Your Company Name
 * All rights reserved.
 */
import React from 'react';
import { Route, BrowserRouter as Router, Switch } from 'react-router-dom';
import AdminDashboard from './components/AdminDashboard';
import Login from './components/Login';
import MakePayment from './components/MakePayment';
import Register from './components/Register';
import RentPhone from './components/RentPhone';

function App() {
    return (
        <Router>
            <Switch>
                <Route path="/register" component={Register} />
                <Route path="/login" component={Login} />
                <Route path="/rent-phone" component={RentPhone} />
                <Route path="/make-payment" component={MakePayment} />
                <Route path="/admin" component={AdminDashboard} />
            </Switch>
        </Router>
    );
}

export default App;