import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';

import imgPerson from '../../assets/images/person.jpg';

class PhotosCarouselComponent extends Component {
    constructor() {
        super();

        this.state = {
            edit: false,
        };

        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
    }

    handleClickEdit() {
        this.setState({ edit: true });
    }

    handleClickCancel() {
        this.setState({ edit: false });
    }

    renderEdit() {
        return (
            <ul className="bxslider">
                <li>
                    <i className="fa fa-minus-circle" aria-hidden="true" title="Delete" />
                    <img src={imgPerson} width="117" height="117" alt="own photos" />
                </li>
                <li>
                    <i className="fa fa-minus-circle" aria-hidden="true" title="Delete" />
                    <img src={imgPerson} width="117" height="117" />
                </li>
                <li>
                    <i className="fa fa-minus-circle" aria-hidden="true" title="Delete" />
                    <img src={imgPerson} width="117" height="117" />
                </li>
                <li>
                    <i className="fa fa-minus-circle" aria-hidden="true" title="Delete" />
                    <img src={imgPerson} width="117" height="117" />
                </li>
                <li>
                    <i className="fa fa-minus-circle" aria-hidden="true" title="Delete" />
                    <img src={imgPerson} width="117" height="117" />
                </li>
                <li>
                    <i className="fa fa-minus-circle" aria-hidden="true" title="Delete" />
                    <img src={imgPerson} width="117" height="117" />
                </li>
                <li>
                    <i className="fa fa-minus-circle" aria-hidden="true" title="Delete" />
                    <img src={imgPerson} width="117" height="117" />
                </li>
                <li>
                    <i className="fa fa-minus-circle" aria-hidden="true" title="Delete" />
                    <img src={imgPerson} width="117" height="117" />
                </li>
                <li>
                    <i className="fa fa-minus-circle" aria-hidden="true" title="Delete" />
                    <img src={imgPerson} width="117" height="117" />
                </li>
                <li>
                    <i className="fa fa-minus-circle" aria-hidden="true" title="Delete" />
                    <img src={imgPerson} width="117" height="117" />
                </li>
            </ul>
        );
    }

    renderView() {
        return (
            <ul className="bxslider">
                <li><img src={imgPerson} width="117" height="117" alt="own photos" /></li>
                <li><img src={imgPerson} width="117" height="117" /></li>
                <li><img src={imgPerson} width="117" height="117" /></li>
                <li><img src={imgPerson} width="117" height="117" /></li>
                <li><img src={imgPerson} width="117" height="117" /></li>
                <li><img src={imgPerson} width="117" height="117" /></li>
                <li><img src={imgPerson} width="117" height="117" /></li>
                <li><img src={imgPerson} width="117" height="117" /></li>
                <li><img src={imgPerson} width="117" height="117" /></li>
                <li><img src={imgPerson} width="117" height="117" /></li>
            </ul>
        );
    }

    render() {
        const { edit } = this.state;
        const { classname, title } = this.props;
        const classNameBox = cl({
            edit: !edit,
            save: edit,
        });
        const classNamesPhotos = cl('white_box photos',
            {
                [classname]: !!classname,
            });
        return (
            <div className={classNamesPhotos}>
                <h3 className={classNameBox}>{title}
                    {
                        edit
                            ? <i className="fa fa-times" aria-hidden="true" onClick={this.handleClickCancel} />
                            : <i onClick={this.handleClickEdit} />
                    }
                </h3>
                {edit ? this.renderEdit() : this.renderView()}
            </div>
        );
    }
}

PhotosCarouselComponent.defaultProps = {
    classname: '',
    title: 'photos',
};

PhotosCarouselComponent.propTypes = {
    classname: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
};

export default PhotosCarouselComponent;
