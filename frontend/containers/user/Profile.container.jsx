import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import {
    updateUser,
    uploadPhotoMe,
    getOwnImages,
    uploadPhotoClinic,
    getClinicImages,
} from '../../actions/user.actions';

import ProfilePage from '../../components/pages/user/Profile.page';

class ProfileContainer extends Component {
    componentDidMount() {
        const { handleGetOwnImages, handleGetPhotoClinic } = this.props;
        handleGetOwnImages();
        handleGetPhotoClinic();
    }

    render() {
        const {
            user,
            ownPhotos,
            clinicPhotos,
            handleUpdateUser,
            handleUploadPhotoMe,
            handleUploadPhotoClinic,
        } = this.props;

        return (
            <ProfilePage
              user={user}
              ownPhotos={ownPhotos}
              clinicPhotos={clinicPhotos}
              handleUpdateUser={handleUpdateUser}
              handleUploadPhotoMe={handleUploadPhotoMe}
              handleUploadPhotoClinic={handleUploadPhotoClinic}
            />
        );
    }
}

ProfileContainer.propTypes = {
    user: PropTypes.object.isRequired,
    ownPhotos: PropTypes.arrayOf(PropTypes.object).isRequired,
    clinicPhotos: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleUpdateUser: PropTypes.func.isRequired,
    handleUploadPhotoMe: PropTypes.func.isRequired,
    handleGetOwnImages: PropTypes.func.isRequired,
    handleUploadPhotoClinic: PropTypes.func.isRequired,
    handleGetPhotoClinic: PropTypes.func.isRequired,
};

const mapStateToProps = (state, ownProps) => ({
    user: state.user,
    ownPhotos: state.user.ownPhotos,
    clinicPhotos: state.user.clinicPhotos,
    modal: state.common.modal,
    ...ownProps,
});

const mapDispatchToProps = dispatch => ({
    handleGetOwnImages: bindActionCreators(getOwnImages, dispatch),
    handleUploadPhotoClinic: bindActionCreators(uploadPhotoClinic, dispatch),
    handleGetPhotoClinic: bindActionCreators(getClinicImages, dispatch),
    handleUploadPhotoMe: bindActionCreators(uploadPhotoMe, dispatch),
    handleUpdateUser: bindActionCreators(updateUser, dispatch),
});

export default connect(mapStateToProps, mapDispatchToProps)(ProfileContainer);
