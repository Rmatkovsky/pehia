import React from 'react';

const MainPage = () => ((
    <div className="main section">
        <div className="header">
            <div className="logo" />
            <div className="menu">
                <ul>
                    <li>
                        <a href="">Projects</a>
                    </li>
                    <li>
                        <a href="">Services</a>
                    </li>
                    <li>
                        <a href="">Company</a>
                    </li>
                    <li>
                        <a href="">Blog</a>
                    </li>
                    <li>
                        <a href="">Contacts</a>
                    </li>
                </ul>
            </div>
            <div className="socials">
                <ul>
                    <li>
                        <a href="" className="icon fb" />
                    </li>
                    <li>
                        <a href="" className="icon dribble" />
                    </li>
                    <li>
                        <a href="" className="icon instagram" />
                    </li>
                </ul>
            </div>
        </div>
        <div className="container">
            <div className="content">
                <h1 className="title">No show, just good work</h1>
                <p>
                    Tubik agency represents a unique and cohesive team of product, brand and digital developers,
                    who has solid expertise in strategy and design thinking.
                </p>
                <button>Hire us <span className="arrow" /> </button>
            </div>
            <div className="tubik_img" />
        </div>
        <div className="footer">
            <div className="mouse" />
        </div>
    </div>
));

export default MainPage;
