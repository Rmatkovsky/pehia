import React, { Component } from 'react';

import person from '../../assets/images/person.jpg';
import advArrow from '../../assets/images/adv_arrow.gif';


class BlockADVComponent extends Component {
    render() {
        return (
            <div className="block adv">
                <p>All the medical help you need.</p>
                <div className="picture">
                    <img src={person} width="48" height="48" />
                </div>
                <div className="link">
                    <a href="#"><img src={advArrow} width="12" height="12" /></a>
                </div>
            </div>
        );
    }
}

export default BlockADVComponent;
