const userByFacebook = data => (
    {
        name: data.first_name,
        last_name: data.last_name,
        email: data.email,
        facebook: data.id,
    }
);

export default {
    req: {
        userByFacebook,
    },
};
