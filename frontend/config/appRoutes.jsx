import React from 'react';

import { Route, Switch } from 'react-router-dom';

import CommonPage from './../components/pages/main/Common.page';
import Layout from '../containers/layouts/Layout.container';
import NoMatchPage from '../components/pages/common/NoMatch.page';

export default (
    <Layout>
        <Switch>
            <Route exact name="Main" path="/" component={CommonPage} />
            <Route component={NoMatchPage} />
        </Switch>
    </Layout>
);
