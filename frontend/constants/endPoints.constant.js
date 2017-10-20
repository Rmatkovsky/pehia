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
        resetPassword: () => '/me/password',
    },
    user: {
        activate: () => '/activate',
    },
};
