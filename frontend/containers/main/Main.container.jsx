import React, { Component } from 'react';

import { connect } from 'react-redux';

import MainPage from '../../components/pages/main/Main.page';

class MainContainer extends Component {

    render() {
        return (
            <MainPage />
        );
    }
}

const mapStateToProps = state => state;

export default connect(mapStateToProps, {})(MainContainer);
