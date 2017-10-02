import React, { Component } from 'react';

import logo from '../../assets/images/logo.png';

class MenuLeftComponent extends Component {
    render() {
        return (
            <aside className="tool">
                <div className="close" />
                <div className="logo">
                    <a href="/"><img src={logo} width="32" height="32" alt="" /></a>
                </div>

                <h3>services</h3>
                <ul className="services">
                    <li>
                        <a href="#" data-toggle="tooltip" title="Equipment">Equipment</a>
                    </li>
                    <li className="active">
                        <a href="#" data-toggle="tooltip" title="Consumables">Consumables</a>
                    </li>
                    <li>
                        <a href="#" data-toggle="tooltip" title="Ambulance">Ambulance</a>
                    </li>
                    <li>
                        <a href="#" data-toggle="tooltip" title="Engineers">Engineers</a>
                    </li>
                </ul>

                <h3>jobs</h3>
                <ul className="jobs">
                    <li><a href="#" data-toggle="tooltip" title="Profession">Profession</a></li>
                    <li><a href="#" data-toggle="tooltip" title="Logistics officers">Logistics officers</a></li>
                    <li><a href="#" data-toggle="tooltip" title="Agents">Agents</a></li>
                    <li><a href="#" data-toggle="tooltip" title="Executives">Executives</a></li>
                    <li><a href="#" data-toggle="tooltip" title="Technical Agents">Technical Agents</a></li>
                </ul>

                <h6>&copy; 2009–2017 Pehia</h6>

            </aside>
        );
    }
}

export default MenuLeftComponent;
