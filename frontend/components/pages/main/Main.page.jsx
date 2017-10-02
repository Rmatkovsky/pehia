import React, { PureComponent } from 'react';

import routes from '../../../constants/routes.constatnt';
import { handlePush } from '../../../utils/history.helper';

import logo from '../../../assets/images/landing/logo1_landing.png';
import logo2 from '../../../assets/images/landing/logo2_landing.png';
import slider1 from '../../../assets/images/landing/slider1.gif';
import slider2 from '../../../assets/images/landing/slider2.gif';
import slider3 from '../../../assets/images/landing/slider3.gif';
import slider4 from '../../../assets/images/landing/slider4.gif';
import video from '../../../assets/images/landing/video.jpg';

import '../../../assets/stylesheets/vendors/jquery.bxslider.css';
import '../../../assets/stylesheets/vendors/landing.css';

import '../../../vendors/landing';

class MainPage extends PureComponent {
    static handleGoToLogin() {
        handlePush({ pathname: routes.auth.login() });
    }

    static handleGoToSignup() {
        handlePush({ pathname: routes.auth.signup() });
    }

    componentWillMount() {
        // landing();
    }

    render() {
        return (
            <div className="landing">
                <ul className="slider">
                    <li>
                        <div className="screen1">
                            <div className="bg">
                                <div className="logo">
                                    <a href="/"><img src={logo} width="48" height="48" /><span>pehia</span></a>
                                </div>
                                <div className="pehia">
                                    <div className="text">Pehia</div>
                                    <div className="search">
                                        <p>
                                            Locate a doctor, find a pharmacy,
                                            <br />
                                            make health benefits choices &amp; more!
                                        </p>
                                        <form action="" method="">
                                            <input
                                              type="text"
                                              placeholder="Start typing to find a products, services or potential jobs..."
                                            />
                                            <input type="submit" value="" />
                                        </form>
                                    </div>
                                    <div className="buttons">
                                        <input
                                          type="button"
                                          className="btn flue"
                                          value="Login"
                                          onClick={MainPage.handleGoToLogin}
                                        />
                                        <input
                                          type="button"
                                          className="btn orange"
                                          value="Sing up"
                                          onClick={MainPage.handleGoToSignup}
                                        />
                                    </div>

                                    <div className="scroll_icon" />
                                    <div className="icon ico1" />
                                    <div className="icon ico2" />
                                    <div className="icon ico3" />
                                    <div className="icon ico4" />
                                    <div className="icon ico21" />
                                    <div className="icon ico22" />
                                    <div className="icon ico23" />
                                    <div className="icon ico5" />
                                    <div className="icon ico6" />
                                    <div className="icon ico7" />
                                    <div className="icon ico24" />
                                    <div className="icon ico25" />
                                    <div className="icon ico8" />
                                    <div className="icon ico9" />
                                    <div className="icon ico10" />
                                    <div className="icon ico11" />
                                    <div className="icon ico12" />
                                    <div className="icon ico13" />
                                    <div className="icon ico14" />
                                    <div className="icon ico15" />
                                    <div className="icon ico16" />
                                    <div className="icon ico17" />
                                    <div className="icon ico18" />
                                    <div className="icon ico19" />
                                    <div className="icon ico20" />
                                </div>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div className="screen2">
                            <div className="bg">
                                <div className="centered">
                                    <div className="head">
                                        <div className="logo">
                                            <a href="/"><img src={logo2} width="32" height="32" /><span>pehia</span></a>
                                        </div>

                                        <div className="buttons">
                                            <input
                                              type="button"
                                              className="btn blue"
                                              value="Login"
                                              onClick={MainPage.handleGoToLogin}
                                            />
                                            <input
                                              type="button"
                                              className="btn green"
                                              value="Sing up"
                                              onClick={MainPage.handleGoToSignup}
                                            />
                                        </div>
                                    </div>

                                    <div className="image"><a rel="media-gallery" href="http://www.youtube.com/embed/L9szn1QQfas?autoplay=1" className="fancybox"><img src={video} /></a></div>
                                    <div className="information">
                                        <div className="text">health</div>
                                        <h2>Easily find quality healthcare</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adiscing elit. Porta hac felis
                                            fusce inceptos quis adipiscing! Morbi lacus aliquet porta sodales...
                                            Hendrerit tellus posuere sollicitudin posuere aenean luctus tristique: </p><p>Lorem ipsum dolor sit amet, consectetur adiscing elit. Porta hac felis
                                        fusce inceptos quis adipiscing! Morbi lacus aliquet porta sodales...
                                        Hendrerit tellus posuere sollicitudin posuere aenean luctus tristique: </p>

                                    </div>

                                </div>
                            </div>
                        </div>
                    </li>

                    <li>
                        <div className="screen3">
                            <div className="bg">
                                <div className="centered">
                                    <div className="logo">
                                        <a href="/"><img src={logo} width="32" height="32" /><span>pehia</span></a>
                                    </div>
                                    <div className="buttons">
                                        <input
                                          type="button"
                                          className="btn blue"
                                          value="Login"
                                          onClick={MainPage.handleGoToLogin}
                                        />
                                        <input
                                          type="button"
                                          className="btn green"
                                          value="Sing up"
                                          onClick={MainPage.handleGoToSignup}
                                        />
                                    </div>

                                </div>

                                <div className="pehia">
                                    <div className="text">statistic</div>

                                </div>


                                <div className="graph">
                                    <div className="pointer pointer1"></div>
                                    <div className="pointer pointer2"></div>
                                    <div className="pointer pointer3"></div>
                                    <div className="pointer pointer4"></div>

                                    <div className="data data1">
                                        <div>5,231</div>
                                        <p>Daily Announcements</p>
                                    </div>

                                    <div className="data data2">
                                        <div>5,231</div>
                                        <p>Our Users</p>
                                    </div>

                                    <div className="data data3">
                                        <div>25,034</div>
                                        <p>$ Paid for The Hour</p>
                                    </div>

                                    <div className="data data4">
                                        <div>127,410</div>
                                        <p>Completed Projects</p>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </li>

                    <li>
                        <div className="screen4">
                            <div className="bg">
                                <div className="centered">
                                    <div className="head">
                                        <div className="logo">
                                            <a href="/"><img src={logo} width="32" height="32" /><span>pehia</span></a>
                                        </div>

                                        <div className="buttons">
                                            <input
                                              type="button"
                                              className="btn blue"
                                              value="Login"
                                              onClick={MainPage.handleGoToLogin}
                                            />
                                            <input
                                              type="button"
                                              className="btn green"
                                              value="Sing up"
                                              onClick={MainPage.handleGoToSignup}
                                            />
                                        </div>
                                    </div>
                                    <div className="information">
                                        <div className="text">categories</div>
                                        <h2>Improve the Health of Your Bottom Line</h2>
                                        <p>Lorem ipsum dolor sit amet, consectetur adiscing elit. Porta hac felis fusce inceptos quis adipiscing! Morbi lacus aliquet porta sodales</p>
                                    </div>

                                    <ul className="bxslider">
                                        <li>
                                            <div className="ico"><img src={slider1} /></div>
                                            <div><a href="#">Medical Equipment</a></div>
                                            <p>ultrasound, endoscopy</p>
                                        </li>

                                        <li>
                                            <div className="ico"><img src={slider2} /></div>
                                            <div><a href="#">Engineers</a></div>
                                            <p>biomedical, quality, IT ...</p>
                                        </li>

                                        <li>
                                            <div className="ico"><img src={slider3} /></div>
                                            <div><a href="#">Medical professions</a></div>
                                            <p>surgeon, pharmacist, nurse</p>
                                        </li>

                                        <li>
                                            <div className="ico"><img src={slider4} /></div>
                                            <div><a href="#">Logistics officers &amp; agents</a></div>
                                            <p>storekeeper, cook, etc</p>
                                        </li>


                                        <li>
                                            <div className="ico"><img src={slider2} /></div>
                                            <div><a href="#">Test</a></div>
                                            <p>test, cook, etc</p>
                                        </li>
                                    </ul>

                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        );
    }
}

export default MainPage;
