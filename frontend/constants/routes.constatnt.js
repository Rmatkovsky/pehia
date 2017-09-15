export default {
    auth: {
        signup: () => '/signup',
        login: () => '/login',
        recovery: () => '/recovery',
        promo: () => '/promo',
    },
    user: {
        profile: () => '/profile',
        resetPassword: () => '/reset_password?token=:token',
    },
    challenges: {
        news: () => '/news',
    },
    main: {
        home: () => '/',
        contact: () => '/contact',
        help: () => '/help',
        about: () => '/about',
        privacy: () => '/privacy',
        terms: () => '/terms',
    },
};
