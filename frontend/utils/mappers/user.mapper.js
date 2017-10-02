
const userLoaded = user => (
    !user
    ? {}
    : {
        id: user.id,
        name: user.name,
        lastName: user.last_name,
        email: user.email,
        typeOfPlans: user.type_of_plans,
        userTypesId: user.user_types_id,
        info: user.info,
        location: user.location,
        phone: user.phone,
    }
);

const updateUser = user => (
    {
        user: {
            name: user.name,
            avatar: user.avatar,
            bio: user.bio,
            email: user.email,
            // current_password,
            // password_confirmation,
            // password,
            private: user.private,
            guest_promocode: user.guest_promocode,
        },
    }
);

const tokenLoaded = response => ({
    credential: {
        accessToken: response.access_token,
        tokenType: response.token_type,
        expiresIn: response.expires_in,
    },
});

export default {
    req: {
        updateUser,
    },
    res: {
        userLoaded,
        tokenLoaded,
    },
};
