export default {
    auth: {
        signup: () => '/signup',
        login: () => '/login',
        recovery: () => '/send_reset_password_email',
        logout: () => '/sessions',
    },
    profile: {
        me: () => '/me',
        update: () => '/me/update',
        updateAvatar: () => '/me/update_avatar',
        uploadPhoto: () => '/me/upload_photo',
        uploadPhotoClinic: () => '/me/upload_photo_clinic',
        resetPassword: () => '/me/password',
        getOwnImages: () => '/me/get_images',
        getClinicImages: () => '/me/get_images_clinic',
    },
    user: {
        activate: () => '/activate',
    },
};
