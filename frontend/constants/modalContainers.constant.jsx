import React from 'react';
import { MODAL_LOGIN } from './modals.constant';

// // Auth
// import AddRoleContainer from '../containers/admin/AddRole.container';
// import EditRoleContainer from '../containers/admin/EditRole.container';
// import ViewRoleContainer from '../containers/admin/ViewRole.container';


const containers = {
    [MODAL_LOGIN]: {
        component: <div />,
        classNames: 'modal-create-roles',
    },
    // [EDIT_ROLE]: {
    //     component: <EditRoleContainer />,
    //     classNames: 'modal-create-roles',
    // },
    // [VIEW_ROLE]: {
    //     component: <ViewRoleContainer />,
    //     classNames: 'modal__view-roles',
    // },
};

export const getContainer = key => containers[key];
