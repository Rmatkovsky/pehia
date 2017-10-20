import React, { Component } from 'react';

import MainInfoComponent from '../../user/MainInfo.component';
import PersonalInfoComponent from '../../user/PersonalInfo.component';
import UserNewsComponent from '../../user/News.component';
import PhotosCarouselComponent from '../../user/PhotosCarousel.component';
import ProfesionalServicesComponent from '../../user/ProfesionalServices.component';

class UserProfilePage extends Component {
    render() {
        const {
            user,
            handleUpdateUser,
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
                        <MainInfoComponent initialValues={{ name: 'matkovsky ruslan' }} />
                        <ProfesionalServicesComponent />
                        <PersonalInfoComponent
                          user={user}
                          handleUpdateUser={handleUpdateUser}
                        />
                        <PhotosCarouselComponent title="photos" />
                        <PhotosCarouselComponent title="clinic photos" classname="clinic" />


                        <UserNewsComponent />

                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfilePage;
