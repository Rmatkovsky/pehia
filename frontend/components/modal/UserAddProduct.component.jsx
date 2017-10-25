import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import {
    requiredCustom,
} from '../../utils/validation.helper';

import FormInput from '../../components/form/FormInput';

class UserAddProductComponent extends Component {
    render() {
        const {
            user,
            handleSubmit,
        } = this.props;

        return (
            <div className="add-item">
                <h3>Add item</h3>
                <Field
                  type="text"
                  name="name"
                  className="input"
                  maxLength={256}
                  component={FormInput}
                  placeholder="Item name"
                  // customErrors={user.error && user.errorData.data ? user.errorData.data.email : []}
                  validate={[
                      requiredCustom('Please enter item name'),
                  ]}
                />
                <Field
                  type="text"
                  name="price"
                  className="input"
                  maxLength={256}
                  component={FormInput}
                  placeholder="Price"
                  // customErrors={user.errorData.data ? user.errorData.data.password : []}
                  validate={[
                      requiredCustom('Please enter item price'),
                  ]}
                />
                <Field
                  type="text"
                  name="description"
                  className="input"
                  maxLength={256}
                  component="textarea"
                  placeholder="Description"
                  // customErrors={user.errorData.data ? user.errorData.data.password : []}
                  validate={[
                      requiredCustom('Please enter item price'),
                  ]}
                />
                <input
                  type="submit"
                  className="btn flue"
                  value="Add item"
                  onClick={handleSubmit}
                />
                <input
                  type="submit"
                  className="btn orange"
                  value="Cancel"
                  onClick={handleSubmit}
                />
            </div>
        );
    }
}

UserAddProductComponent.propTypes = {
    user: PropTypes.object.isRequired,
    handleSubmit: PropTypes.func.isRequired,
    handleFacebookLogin: PropTypes.func.isRequired,
    handleGoogleLogin: PropTypes.func.isRequired,
};

const initializeForm = reduxForm({
    form: 'addItem',
})(UserAddProductComponent);

export default connect(state => ({ addItem: state.form.addItem }))(initializeForm);
