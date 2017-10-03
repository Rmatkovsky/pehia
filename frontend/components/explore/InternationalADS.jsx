import React, { Component } from 'react';

import person from '../../assets/images/person.jpg';

class InternationalADSComponent extends Component {
    render() {
        return (
            <div className="block">
                <div className="picture">
                    {/*<div className="no_picture">KL</div>*/}
                    <img src={person} width="48" height="48" />
                </div>
                <div className="info">
                    <h3>Charlie Yates</h3>
                    <div className="place">San Jose, CA</div>
                </div>
            </div>

        );
    }
}

export default InternationalADSComponent;
