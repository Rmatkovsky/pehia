import React, { PureComponent } from 'react';
import {
    Navbar,
} from 'react-bootstrap';

import PropTypes from 'prop-types';

import { Link } from 'react-router-dom';

import routes from '../../constants/routes.constatnt';

class Header extends PureComponent {
    render() {
        return (
            <h1>Header</h1>
        );
    }
}

export default Header;
