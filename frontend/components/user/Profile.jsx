import React, { Component } from 'react';

import person from '../../assets/images/person.jpg';

class UserProfileComponent extends Component {
    render() {
        return (
            <div className="user">
                <a href="#"><img src={person} width="32" height="32" alt="" /></a>
                <span className="notification"></span>
            </div>
        );
    }
}

export default UserProfileComponent;
