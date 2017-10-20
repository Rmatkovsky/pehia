import React, { Component } from 'react';
import PropTypes from 'prop-types';

import PersonalInfoContactsComponent from '../user/personalInfo/Contacts.component';
import PersonalInfoEquipmentComponent from '../user/personalInfo/Equipment.component';

class PersonalInfoComponent extends Component {
    render() {
        const { user, handleUpdateUser } = this.props;
        return (
            <div className="personal_info">
                <PersonalInfoContactsComponent
                  user={user}
                  initialValues={user}
                  onSubmit={handleUpdateUser}
                />
                <PersonalInfoEquipmentComponent />
            </div>

        );
    }
}

PersonalInfoComponent.propTypes = {
    user: PropTypes.object.isRequired,
    handleUpdateUser: PropTypes.func.isRequired,
};

export default PersonalInfoComponent;
