import React, { Component } from 'react';
import PropTypes from 'prop-types';

class PersonalInfoEquipmentComponent extends Component {
    render() {
        return (
            <div className="equipments">
                <div className="white_box">
                    <h3 className="edit">Equipment &amp; evaluation</h3>
                    <div className="line">
                        <div className="name">
                            <span className="icons equipment" />
                            <a href="#">Cardiograph</a>
                        </div>
                        <div className="review">
                            <span className="star-colored" />
                            <span className="star-colored" />
                            <span className="star-colored" />
                            <span className="star-colored" />
                            <span className="star-gray" />
                        </div>
                    </div>

                    <div className="line">
                        <div className="name">
                            <span className="icons equipment" />
                            <a href="#">Cardiograph</a>
                        </div>
                        <div className="review">
                            <span className="star-colored" />
                            <span className="star-colored" />
                            <span className="star-colored" />
                            <span className="star-colored" />
                            <span className="star-gray" />
                        </div>
                    </div>

                    <div className="line">
                        <div className="name">
                            <span className="icons equipment" />
                            <a href="#">Cardiograph</a>
                        </div>
                        <div className="review">
                            <span className="star-colored" />
                            <span className="star-colored" />
                            <span className="star-colored" />
                            <span className="star-colored" />
                            <span className="star-gray" />
                        </div>
                    </div>

                </div>
            </div>
        );
    }
}

export default PersonalInfoEquipmentComponent;
