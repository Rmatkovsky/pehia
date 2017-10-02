import React, { Component } from 'react';

import MenuLeftComponent from '../../explore/MenuLeft';
import ItemExploreComponent from '../../explore/Item';

import '../../../assets/stylesheets/vendors/style.css';
import '../../../vendors/main';

import logo from '../../../assets/images/logo.png';
import person from '../../../assets/images/person.jpg';
import star from '../../../assets/images/star.png';
import personCarousel from '../../../assets/images/person_carousel.jpg';
import starGray from '../../../assets/images/star_gray.png';
import advArrow from '../../../assets/images/adv_arrow.gif';

class UsersPage extends Component {
    render() {
        return (
            <div className="bg">
                <div className="content">
                    <div className="header">
                        <div className="responsive" />
                        <div className="logo">
                            <a href="/"><img src={logo} width="32" height="32" alt="" /></a>
                        </div>
                        <div className="search_box">
                            <form method="" className="search">
                                <input type="submit" value="" />
                                <input type="text" value="Search" />
                            </form>
                        </div>
                    </div>
                    <MenuLeftComponent />
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
                            <div className="switcher">
                                <a href="#" id="list"></a>
                                <a href="#" id="icons"></a>
                            </div>
                        </div>

                        <div className="scrollbar">

                            <div className="block gold">
                                <div className="picture">
                                    <img src={person} width="64" height="64" />
                                </div>
                                <div className="info">
                                    <div className="top">
                                        <div className="actions">
                                            <a href="#" className="follow">following</a>
                                            <a href="#" className="mail active">&nbsp;</a>
                                        </div>
                                        <h3>Nathan Nicholson <span>Trending</span></h3>
                                    </div>
                                    <div className="rating">
                                        <div className="star">
                                            <img src={star} width="16" height="15" />
                                            <img src={star} width="16" height="15" />
                                            <img src={star} width="16" height="15" />
                                            <img src={star} width="16" height="15" />
                                            <img src={star} width="16" height="15" />
                                        </div>
                                        <em>5 average based on 27,642 ratings.</em>
                                    </div>
                                    <div className="price">$ 29.82</div>
                                    <div className="place">San Jose, CA</div>
                                    <div className="text">Field sales training. 5+ years in an outside sales position (medical related fields..</div>
                                </div>
                            </div>

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

                            <ItemExploreComponent />
                            <ItemExploreComponent />
                            <ItemExploreComponent />

                        </div>

                    </div>
                    <div className="right">
                        <div className="user">
                            <a href="#"><img src={person} width="32" height="32" alt="" /></a>
                            <span className="notification"></span>
                        </div>
                        <h3>International Ads</h3>
                        <div className="scrollbar">
                            <div className="block">
                                <div className="picture">
                                    <img src={person} width="48" height="48" />
                                </div>
                                <div className="info">
                                    <h3>Charlie Yates</h3>
                                    <div className="place">San Jose, CA</div>
                                </div>
                            </div>

                            <div className="block">
                                <div className="no_picture">
                                    KL
                                </div>
                                <div className="info">
                                    <h3>Charlie Yates</h3>
                                    <div className="place">San Jose, CA</div>
                                </div>
                            </div>

                            <div className="block">
                                <div className="picture">
                                    <img src={person} width="48" height="48" />
                                </div>
                                <div className="info">
                                    <h3>Charlie Yates</h3>
                                    <div className="place">San Jose, CA</div>
                                </div>
                            </div>

                            <div className="block">
                                <div className="picture">
                                    <img src={person} width="48" height="48" />
                                </div>
                                <div className="info">
                                    <h3>Charlie Yates</h3>
                                    <div className="place">San Jose, CA</div>
                                </div>
                            </div>

                            <div className="block adv">
                                <p>All the medical help you need.</p>
                                <div className="picture">
                                    <img src={person} width="48" height="48" />
                                </div>
                                <div className="link">
                                    <a href="#"><img src={advArrow} width="12" height="12" /></a>
                                </div>
                            </div>

                            <div className="block">
                                <div className="picture">
                                    <img src={person} width="48" height="48" />
                                </div>
                                <div className="info">
                                    <h3>Charlie Yates</h3>
                                    <div className="place">San Jose, CA</div>
                                </div>
                            </div>

                            <div className="block">
                                <div className="picture">
                                    <img src={person} width="48" height="48" />
                                </div>
                                <div className="info">
                                    <h3>Charlie Yates</h3>
                                    <div className="place">San Jose, CA</div>
                                </div>
                            </div>

                            <div className="block">
                                <div className="picture">
                                    <img src={person} width="48" height="48" />
                                </div>
                                <div className="info">
                                    <h3>Charlie Yates</h3>
                                    <div className="place">San Jose, CA</div>
                                </div>
                            </div>


                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UsersPage;
