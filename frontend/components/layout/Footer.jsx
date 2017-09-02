import React, { PureComponent } from 'react';

import { Link } from 'react-router-dom';

import routes from '../../constants/routes.constatnt';

class Footer extends PureComponent {
    render() {
        return (
            <footer>
                <div className="container">
                    <div className="pull-left">
                        <ul>
                            <li>
                                <Link to={routes.main.about()}>About us</Link>
                            </li>
                            <li>
                                <Link to={routes.main.contact()}>Contact us</Link>
                            </li>
                            <li>
                                <Link to={routes.main.help()}>Help</Link>
                            </li>
                            <li>
                                <Link to={routes.main.privacy()}>Privacy</Link>
                            </li>
                            <li>
                                <Link to={routes.main.terms()}>Terms</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="pull-right">
                        <span className="copyright">
                            OutDoo © 2017
                        </span>
                    </div>
                </div>
            </footer>
        );
    }
}

export default Footer;
