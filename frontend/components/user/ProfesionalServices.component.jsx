import React, { Component } from 'react';
import PropTypes from 'prop-types';

import ProfiServicesConstants from '../../constants/user/ProfiServices.constant';

class ProfesionalServicesComponent extends Component {
    constructor() {
        super();
        this.state = {
            activeComponent: ProfiServicesConstants[0],
        };
    }

    handleSelectComponent(component) {
        this.setState({ activeComponent: component });
    }

    renderActiveComponent() {
        const { activeComponent } = this.state;
        return activeComponent.component;
    }

    render() {
        const { activeComponent } = this.state;
        return (
            <div className="services">
                <div className="responsive_small" />
                <div className="left">
                    <div className="close" />
                    <h3>Profesional services</h3>
                    <ul>
                        {
                            ProfiServicesConstants.map(item => (
                                <li
                                  className={activeComponent.name === item.name ? 'active' : null}
                                >
                                    <a
                                      onClick={this.handleSelectComponent.bind(this, item)}
                                    >
                                        {item.name}
                                    </a>
                                </li>
                            ))
                        }
                    </ul>
                </div>
                {this.renderActiveComponent()}

            </div>
        );
    }
}

export default ProfesionalServicesComponent;
