import React from 'react';

import { Route, Switch } from 'react-router-dom';

import MainContainer from './../containers/main/Main.container';
import LoginContainer from '../containers/common/Login.container';
import SignupContainer from '../containers/common/Signup.container';
import ActivateContainer from '../containers/common/Activate.container';
import ExploreContainer from '../containers/common/Explore.container';
import UserProfileContainer from '../containers/user/Profile.container';
import Layout from '../containers/layouts/Layout.container';
import NoMatchPage from '../components/pages/common/NoMatch.page';

export default (
    <Layout>
        <Switch>
            <Route exact name="Main" path="/" component={MainContainer} />
            <Route exact name="Login" path="/login" component={LoginContainer} />
            <Route exact name="SignUp" path="/signup" component={SignupContainer} />
            <Route exact name="ActivateUser" path="/activate" component={ActivateContainer} />
            <Route exact name="Explore" path="/explore" component={ExploreContainer} />
            <Route exact name="UserProfile" path="/profile" component={UserProfileContainer} />
            <Route component={NoMatchPage} />
        </Switch>
    </Layout>
);
