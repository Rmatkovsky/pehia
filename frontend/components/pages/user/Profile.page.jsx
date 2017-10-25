import React, { Component } from 'react';
import PropTypes from 'prop-types';

import MainInfoComponent from '../../user/MainInfo.component';
import PersonalInfoComponent from '../../user/PersonalInfo.component';
import UserNewsComponent from '../../user/News.component';
import PhotosCarouselComponent from '../../user/PhotosCarousel.component';
import ProfesionalServicesComponent from '../../user/ProfesionalServices.component';

class UserProfilePage extends Component {
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
            <div className="txt">
                <div className="search_box">
                    <a href="#" className="add_post">Post ADS</a>

                    <form method="" className="search">
                        <input type="submit" value="" />
                        <input type="text" value="Search" />
                    </form>
                </div>

                <div className="view">
                    <div className="filter">
                        <span>Logistics officers</span>
                        <div className="button">
                            <select>
                                <option>Filter by</option>
                                <option>By name</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="scrollbar">

                    <div className="store_page profile">
                        <MainInfoComponent initialValues={user.payload} onSubmit={handleUpdateUser} />
                        <ProfesionalServicesComponent />
                        <PersonalInfoComponent
                          user={user.payload}
                          handleUpdateUser={handleUpdateUser}
                        />
                        <PhotosCarouselComponent
                          title="photos"
                          photos={ownPhotos}
                          handleUpload={handleUploadPhotoMe}
                        />
                        <PhotosCarouselComponent
                          title="clinic photos"
                          classname="clinic"
                          photos={clinicPhotos}
                          handleUpload={handleUploadPhotoClinic}
                        />

                        <UserNewsComponent />

                    </div>
                </div>
            </div>
        );
    }
}

UserProfilePage.propTypes = {
    user: PropTypes.object.isRequired,
    ownPhotos: PropTypes.arrayOf(PropTypes.object).isRequired,
    clinicPhotos: PropTypes.arrayOf(PropTypes.object).isRequired,
    handleUpdateUser: PropTypes.func.isRequired,
    handleUploadPhotoMe: PropTypes.func.isRequired,
    handleUploadPhotoClinic: PropTypes.func.isRequired,
};

export default UserProfilePage;
