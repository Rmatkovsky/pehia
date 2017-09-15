import React from 'react';

import { Route, Switch } from 'react-router-dom';

import MainContainer from './../containers/main/Main.container';
import LoginContainer from '../containers/common/Login.container';
import SignupContainer from '../containers/common/Signup.container';
import Layout from '../containers/layouts/Layout.container';
import NoMatchPage from '../components/pages/common/NoMatch.page';

export default (
    <Layout>
        <Switch>
            <Route exact name="Main" path="/" component={MainContainer} />
            <Route exact name="Login" path="/login" component={LoginContainer} />
            <Route exact name="SignUp" path="/signup" component={SignupContainer} />
            <Route component={NoMatchPage} />
        </Switch>
    </Layout>
);
