import Base from './Base';


class ImageModel extends Base {
    constructor(db) {
        super(db);
        this.tableName = 'images';
    }

    addImage(url) {
        return this.insert({ url });
    }
}

export default ImageModel;
