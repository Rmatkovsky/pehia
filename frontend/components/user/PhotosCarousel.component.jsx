import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cl from 'classnames';
import $ from 'jquery';

class PhotosCarouselComponent extends Component {
    constructor() {
        super();

        this.state = {
            edit: false,
            slideUpdate: false,
        };

        this.handleClickCancel = this.handleClickCancel.bind(this);
        this.handleClickEdit = this.handleClickEdit.bind(this);
        this.handleFileUpload = this.handleFileUpload.bind(this);
    }

    componentDidUpdate() {
        const { slideUpdate } = this.state;
        const { photos } = this.props;
        if (!slideUpdate && photos.length) {
            $(this.photos).bxSlider({
                minSlides: 1,
                maxSlides: 7,
                slideWidth: 117,
                slideMargin: 4,
            });
            this.state.slideUpdate = true;
        }
    }

    handleFileUpload(e) {
        const { handleUpload } = this.props;
        const files = e.target.files;
        const data = new FormData();

        for (let i = 0; i < files.length; i++) {
            data.append('files', files[i]);
            data.append('name', files[i].name);
        }

        handleUpload(data);
    }

    handleClickEdit() {
        this.setState({ edit: true });
    }

    handleClickCancel() {
        this.setState({ edit: false });
    }

    renderEdit() {
        const { photos } = this.props;

        return (
            <ul className="bxslider" ref={(photos) => {this.photos = photos;}}>
                {
                    photos.map((item) => {
                        const url = `/images/${item.url}`;

                        return (
                            <li>
                                <i className="fa fa-minus-circle" aria-hidden="true" title="Delete" />
                                <img src={url} width="117" height="117" alt="own photos" />
                            </li>
                        );
                    })
                }
            </ul>
        );
    }

    renderView() {
        const { photos } = this.props;
        return (
            <ul className="bxslider" ref={(photos) => {this.photos = photos;}}>
                {
                    photos.map((item) => {
                        const url = `/images/${item.url}`;
                        return (<li><img src={url} width="117" height="117" alt="own photos"/></li>)
                    })
                }
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
                            ? <div className="control-element">
                                <i className="fa fa-times" aria-hidden="true" onClick={this.handleClickCancel} />
                                <i className="fa fa-plus" aria-hidden="true">
                                    <input type="file" className="upload" multiple onChange={this.handleFileUpload} />
                                </i>
                            </div>
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
    photos: [],
};

PhotosCarouselComponent.propTypes = {
    classname: PropTypes.string.isRequired,
    photos: PropTypes.arrayOf(PropTypes.object).isRequired,
    title: PropTypes.string.isRequired,
    handleUpload: PropTypes.func.isRequired,
};

export default PhotosCarouselComponent;
