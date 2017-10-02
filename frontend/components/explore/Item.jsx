import React, { Component } from 'react';

import star from '../../assets/images/star.png';
import starGray from '../../assets/images/star_gray.png';
import person from '../../assets/images/person.jpg';

class ItemExploreComponent extends Component {
    render() {
        return (
            <div className="block">
                <div className="picture">
                    <img src={person} width="64" height="64" />
                </div>
                <div className="info">
                    <div className="top">
                        <div className="actions">
                            <a href="#" className="follow active">follow</a>
                            <a href="#" className="mail">&nbsp;</a>
                        </div>
                        <h3>Charlie Yates</h3>
                    </div>
                    <div className="rating">
                        <div className="star">
                            <img src={star} width="16" height="15" />
                            <img src={star} width="16" height="15" />
                            <img src={starGray} width="16" height="15" />
                            <img src={starGray} width="16" height="15" />
                            <img src={starGray} width="16" height="15" />
                        </div>
                        <em>2.54 average based on 27,642 ratings.</em>
                    </div>
                    <div className="price">$ 29.82</div>
                    <div className="place">San Jose, CA</div>
                    <div className="text">
                        Field sales training. 5+ years in an outside sales position (medical related fields..
                    </div>
                </div>
            </div>

        );
    }
}

export default ItemExploreComponent;
