import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import queryString from 'query-string';

import { loginUser, activateUser } from '../../actions/user.actions';
import ActivatePage from '../../components/pages/common/Activate.page';

class ActivateContainer extends PureComponent {
    componentDidMount() {
        const { location, handleActivateUser } = this.props;
        const parsed = queryString.parse(location.search);

        handleActivateUser({ token: parsed.token });
    }
    render() {
        const { user } = this.props;
        return (
            <ActivatePage
              user={user}
            />
        );
    }
}

ActivateContainer.propTypes = {
    location: PropTypes.object.isRequired,
    user: PropTypes.object.isRequired,
    handleActivateUser: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
    user: state.user,
});

const mapDispatchToProps = dispatch => ({
    handleActivateUser: bindActionCreators(activateUser, dispatch),
    handleLoginedUser: bindActionCreators(loginUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ActivateContainer);
