import React, { Component } from 'react';
import PropTypes from 'prop-types';

class UserNewsComponent extends Component {
    render() {
        return (
            <div className="white_box news">
                <h3>news</h3>
                <div className="line">
                    <img src="img/person.jpg" width="65" height="65" />
                    <div className="info">
                        <h3><a href="#">OPTIL Medical Corporation</a></h3>
                        <div className="date">Today, at 10:23 am</div>
                        <p><strong>Added 3 photo.</strong> Field sales training. 5+ years in an outside sales position (medical related fields)</p>
                        <div className="photo">
                            <img src="img/person.jpg" width="80" height="80" />
                            <img src="img/person.jpg" width="80" height="80" />
                            <img src="img/person.jpg" width="80" height="80" />
                        </div>
                    </div>
                </div>

                <div className="line">
                    <img src="img/person.jpg" width="65" height="65" />
                    <div className="info">
                        <h3><a href="#">OPTIL Medical Corporation</a></h3>
                        <div className="date">Today, at 10:23 am</div>
                        <p><strong>Added 3 photo.</strong> Field sales training. 5+ years in an outside sales position (medical related fields)</p>
                        <div className="photo">
                            <img src="img/person.jpg" width="80" height="80" />
                            <img src="img/person.jpg" width="80" height="80" />
                            <img src="img/person.jpg" width="80" height="80" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserNewsComponent;
