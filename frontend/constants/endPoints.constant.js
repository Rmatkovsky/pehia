export default {
    auth: {
        signup: () => '/signup',
        login: () => '/login',
        recovery: () => '/send_reset_password_email',
        logout: () => '/sessions',
    },
    profile: {
        me: () => '/me',
        update: () => '/me',
        resetPassword: () => '/me/password',
    },
    user: {
        uniqueName: () => '/check_name_uniqueness',
        uniqueEmail: () => '/check_email_uniqueness',
    },
};
