import Base from './Base';

class UserImageClinicModel extends Base {
    constructor(db) {
        super(db);
        this.tableName = 'users_has_company_images';
    }

    addImage(userId, imageId) {
        return this.insert({ users_id: userId, images_id: imageId });
    }

    getByUser(userId) {
        return this.selectLeftJoin('two.id, two.url', 'images', 'two.id = one.images_id', `one.users_id = ${userId}`);
    }
}

export default UserImageClinicModel;
