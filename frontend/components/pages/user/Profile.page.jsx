import React, { Component } from 'react';

class UserProfilePage extends Component {
    render() {
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
                    <div className="switcher">
                        <a href="#" id="list"></a>
                        <a href="#" id="icons"></a>
                    </div>
                </div>

                <div className="scrollbar">

                    <div className="store_page profile">
                        <div className="top">
                            <div className="person"><img src="img/person.jpg" width="113" height="113" /></div>
                            <div className="follow"><a href="#">Follow</a></div>
                            <div className="info">
                                <h3>Claudio Guglieri</h3>
                                <p>Communications - Associate Sales Represent...</p>
                                <div className="star">
                                    <img src="img/star_active_big.png" width="20" height="18" />
                                    <img src="img/star_active_big.png" width="20" height="18" />
                                    <img src="img/star_active_big.png" width="20" height="18" />
                                    <img src="img/star_active_big.png" width="20" height="18" />
                                    <img src="img/star_active_big.png" width="20" height="18" />
                                </div>
                                <div className="data">
                                    <div>Followers:</div>
                                    <strong>1, 268</strong>
                                </div>
                                <div className="data">
                                    <div>following:</div>
                                    <strong>1, 268</strong>
                                </div>
                            </div>
                        </div>

                        <ul className="tabs">
                            <li className="active">Profile</li>
                            <li><a href="#">Store</a></li>
                        </ul>



                        <div className="white_box text_block">
                            <h3>Welcome to Indieground's medical Shop</h3>
                            <p>Hey this is Claudio!</p>
                            <p>I’m 28 years old and I’m a doctor from Italy! I love my job and my goal is to improve myself and becomea better doctor day by day. Music is my greatest source of inspiration. I hope you can enjoy my equipme.  </p>
                        </div>


                        <div className="personal_info">
                            <div className="contacts">
                                <div className="white_box">
                                    <h3>Contact &amp; Personal info</h3>

                                    <div className="line">
                                        <img src="img/location_ico.png" width="14" height="22" />
                                        <div className="info">
                                            <p>Location</p>
                                            <div>New York, NY</div>
                                        </div>
                                    </div>

                                    <div className="line">
                                        <img src="img/email_ico.png" width="20" height="22" />
                                        <div className="info">
                                            <p>Email</p>
                                            <div>mail@mail.com</div>
                                        </div>
                                    </div>

                                    <div className="line">
                                        <img src="img/phone_ico.png" width="14" height="22" />
                                        <div className="info">
                                            <p>Phone</p>
                                            <div>+10382000000</div>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="equipments">
                                <div className="white_box">
                                    <h3>Equipment &amp; evaluation</h3>
                                    <div className="line">
                                        <div className="name">
                                            <img src="img/equipment_ico.gif" width="18" height="13" />
                                            <a href="#">Cardiograph</a>
                                        </div>
                                        <div className="review"> 
                                            <img src="img/star_colored.gif" width="14" height="13" /><img src="img/star_colored.gif" width="14" height="13" /><img src="img/star_colored.gif" width="14" height="13" /><img src="img/star_colored.gif" width="14" height="13" /><img src="img/star_gray.gif" width="14" height="13" />
                                        </div>
                                    </div>

                                    <div className="line">
                                        <div className="name">
                                            <img src="img/equipment_ico.gif" width="18" height="13" />
                                            <a href="#">Cardiograph</a>
                                        </div>
                                        <div className="review"> 
                                            <img src="img/star_colored.gif" width="14" height="13" /><img src="img/star_colored.gif" width="14" height="13" /><img src="img/star_colored.gif" width="14" height="13" /><img src="img/star_colored.gif" width="14" height="13" /><img src="img/star_gray.gif" width="14" height="13" />
                                        </div>
                                    </div>

                                    <div className="line">
                                        <div className="name">
                                            <img src="img/equipment_ico.gif" width="18" height="13" />
                                            <a href="#">Cardiograph</a>
                                        </div>
                                        <div className="review"> 
                                            <img src="img/star_colored.gif" width="14" height="13" /><img src="img/star_colored.gif" width="14" height="13" /><img src="img/star_colored.gif" width="14" height="13" /><img src="img/star_colored.gif" width="14" height="13" /><img src="img/star_gray.gif" width="14" height="13" />
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>



                        <div className="white_box photos">
                            <h3>photos</h3>

                            <ul className="bxslider">
                                <li><img src="img/person.jpg" width="117" height="117" /></li>
                                <li><img src="img/person.jpg" width="117" height="117" /></li>
                                <li><img src="img/person.jpg" width="117" height="117" /></li>
                                <li><img src="img/person.jpg" width="117" height="117" /></li>
                                <li><img src="img/person.jpg" width="117" height="117" /></li>
                                <li><img src="img/person.jpg" width="117" height="117" /></li>
                                <li><img src="img/person.jpg" width="117" height="117" /></li>
                                <li><img src="img/person.jpg" width="117" height="117" /></li>
                                <li><img src="img/person.jpg" width="117" height="117" /></li>
                                <li><img src="img/person.jpg" width="117" height="117" /></li>
                            </ul>
                        </div>


                        <div className="white_box photos clinic">
                            <h3>clinic photos</h3>

                            <ul className="bxslider">
                                <li><img src="img/person.jpg" width="117" height="117" /></li>
                                <li><img src="img/person.jpg" width="117" height="117" /></li>
                                <li><img src="img/person.jpg" width="117" height="117" /></li>
                                <li><img src="img/person.jpg" width="117" height="117" /></li>
                                <li><img src="img/person.jpg" width="117" height="117" /></li>
                                <li><img src="img/person.jpg" width="117" height="117" /></li>
                                <li><img src="img/person.jpg" width="117" height="117" /></li>
                                <li><img src="img/person.jpg" width="117" height="117" /></li>
                                <li><img src="img/person.jpg" width="117" height="117" /></li>
                                <li><img src="img/person.jpg" width="117" height="117" /></li>
                            </ul>
                        </div>



                        <div className="banner">
                            <div className="box">
                                <div className="image">
                                    <div>Opening a new nano<br />clinic in 2018</div>
                                </div>
                                <div className="text">
                                    The opening of a new nano clinic in San Francisco, the newest equipment
                                    <a href="#" className="more">more</a>

                                </div>
                            </div>
                        </div>


                        <div className="white_box followers">
                            <h3>followers</h3>
                            <a href="#"><img src="img/person.jpg" width="62" height="62" /></a>
                            <a href="#"><img src="img/person.jpg" width="62" height="62" /></a>
                            <a href="#"><img src="img/person.jpg" width="62" height="62" /></a>
                            <a href="#"><img src="img/person.jpg" width="62" height="62" /></a>
                            <a href="#"><img src="img/person.jpg" width="62" height="62" /></a>
                            <a href="#"><img src="img/person.jpg" width="62" height="62" /></a>
                            <a href="#"><img src="img/person.jpg" width="62" height="62" /></a>
                            <a href="#"><img src="img/person.jpg" width="62" height="62" /></a>
                            <a href="#"><img src="img/person.jpg" width="62" height="62" /></a>
                            <a href="#"><img src="img/person.jpg" width="62" height="62" /></a>
                            <a href="#"><img src="img/person.jpg" width="62" height="62" /></a>
                            <a href="#"><img src="img/person.jpg" width="62" height="62" /></a>
                            <a href="#"><img src="img/person.jpg" width="62" height="62" /></a>
                            <a href="#"><img src="img/person.jpg" width="62" height="62" /></a>
                        </div>

                        <div className="white_box ads">
                            <h3>new ads</h3>
                            <div className="items">
                                <div className="box">
                                    <div>
                                        <div className="picture"><a href="#"><img src="img/item.jpg" /></a></div>
                                        <p>Only today the Quadropower delivery around the city at apleasant price</p>
                                        <div className="price"><sup>$</sup>10</div>
                                    </div>
                                </div>

                                <div className="box">
                                    <div>
                                        <div className="picture"><a href="#"><img src="img/item.jpg" /></a></div>
                                        <p>Only today the Quadropower delivery around the city at apleasant price</p>
                                        <div className="price"><sup>$</sup>10</div>
                                    </div>
                                </div>

                                <div className="box">
                                    <div>
                                        <div className="picture"><a href="#"><img src="img/item.jpg" /></a></div>
                                        <p>Only today the Quadropower delivery around the city at apleasant price</p>
                                        <div className="price"><sup>$</sup>10</div>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default UserProfilePage;
