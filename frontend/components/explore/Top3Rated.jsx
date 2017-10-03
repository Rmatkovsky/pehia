import React, { Component } from 'react';

import personCarousel from '../../assets/images/person_carousel.jpg';

class Top3RatedComponent extends Component {
    render() {
        return (
            <div className="bottom_shadow">
                <div className="carousel">
                    <ul className="bxslider">
                        <li>
                            <div className="picture">
                                <img src={personCarousel} width="160" height="160" />
                            </div>
                            <div className="info">
                                <h4>Top 3 Rated</h4>
                                <h3>Claudio Guglieri</h3>
                                <p>Communications - Associate Sales Represent...</p>
                                <a href="#" className="more">more</a>
                            </div>
                        </li>
                        <li>
                            <div className="picture">
                                <img src={personCarousel} width="160" height="160" />
                            </div>
                            <div className="info">
                                <h4>Top 3 Rated</h4>
                                <h3>Claudio Guglieri11</h3>
                                <p>Communications - Associate Sales Represent...</p>
                                <a href="#" className="more">more</a>
                            </div>
                        </li>
                        <li>
                            <div className="picture">
                                <img src={personCarousel} width="160" height="160" />
                            </div>
                            <div className="info">
                                <h4>Top 3 Rated</h4>

                                <h3>Claudio Guglieri33</h3>
                                <p>Communications - Associate Sales Represent...</p>
                                <a href="#" className="more">more</a>
                            </div>
                        </li>
                    </ul>
                </div>
                <div className="shadow" />
            </div>
        );
    }
}

export default Top3RatedComponent;
