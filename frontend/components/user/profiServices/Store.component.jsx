import React, { Component } from 'react';
import PropTypes from 'prop-types';
import imgItem from '../../../assets/images/item.jpg';

import { USER_ADD_PRODUCT } from '../../../constants/modals.constant';

class UserStoreComponent extends Component {
    constructor() {
        super();

        this.handleAddItem = this.handleAddItem.bind(this);
    }

    handleAddItem() {
        const { handleOpenModal } = this.context;
        handleOpenModal(USER_ADD_PRODUCT);
    }

    render() {
        return (
            <div className="cont">
                <h3 className="edit">
                    34 items
                    <a href="#" className="pencil" />
                    <a href="#" className="basket" onClick={this.handleAddItem} />
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

UserStoreComponent.contextTypes = {
    handleOpenModal: PropTypes.func.isRequired,
}

export default UserStoreComponent;
