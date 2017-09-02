import { UserAuthWrapper } from 'redux-auth-wrapper';
import { handleReplace } from '../history.helper';

export const UserIsAuthorized = UserAuthWrapper({
    authSelector: state => state.user,
    predicate: ({ ...isAuthorized }) => !!isAuthorized,
    redirectAction: () => () => handleReplace({ pathname: 'login' }),
    wrapperDisplayName: 'UserIsAuthorized',
});
