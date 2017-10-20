import React, { Component } from 'react';

import imgItem from '../../../assets/images/item.jpg';

class UserStoreComponent extends Component {
    render() {
        return (
            <div className="cont">
                <h3 className="edit">
                    34 items
                    <a href="#" className="pencil" />
                    <a href="#" className="basket" />
                </h3>


                <div className="items">
                    <div className="box">
                        <div>
                            <div className="picture"><a href="#"><img src={imgItem} /></a></div>
                            <p>Item number</p>
                            <div className="price">$ 100</div>
                        </div>
                    </div>

                    <div className="box">
                        <div>
                            <div className="picture"><a href="#"><img src={imgItem} /></a></div>
                            <p>Item number</p>
                            <div className="price">$ 100</div>
                        </div>
                    </div>

                    <div className="box">
                        <div>
                            <div className="picture"><a href="#"><img src={imgItem} /></a></div>
                            <p>Item number</p>
                            <div className="price">$ 100</div>
                        </div>
                    </div>

                    <div className="box">
                        <div>
                            <div className="picture"><a href="#"><img src={imgItem} /></a></div>
                            <p>Item number</p>
                            <div className="price">$ 100</div>
                        </div>
                    </div>

                    <div className="box">
                        <div>
                            <div className="picture"><a href="#"><img src={imgItem} /></a></div>
                            <p>Item number</p>
                            <div className="price">$ 100</div>
                        </div>
                    </div>

                    <div className="box">
                        <div>
                            <div className="picture"><a href="#"><img src={imgItem} /></a></div>
                            <p>Item number</p>
                            <div className="price">$ 100</div>
                        </div>
                    </div>


                    <div className="box">
                        <div>
                            <div className="picture"><a href="#"><img src={imgItem} /></a></div>
                            <p>Item number</p>
                            <div className="price">$ 100</div>
                        </div>
                    </div>

                    <div className="box">
                        <div>
                            <div className="picture"><a href="#"><img src={imgItem} /></a></div>
                            <p>Item number</p>
                            <div className="price">$ 100</div>
                        </div>
                    </div>

                    <div className="box">
                        <div>
                            <div className="picture"><a href="#"><img src={imgItem} /></a></div>
                            <p>Item number</p>
                            <div className="price">$ 100</div>
                        </div>
                    </div>

                </div>

            </div>
        );
    }
}

export default UserStoreComponent;
