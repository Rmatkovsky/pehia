const userByFacebook = data => (
    {
        name: `${data.first_name} ${data.last_name}`,
        email: data.email,
        facebook: data.id,
        status: '1',
    }
);

export default {
    req: {
        userByFacebook,
    },
};
