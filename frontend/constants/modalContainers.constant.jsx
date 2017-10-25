import React from 'react';
import { USER_ADD_PRODUCT } from './modals.constant';

import AddProductContainer from '../containers/user/store/AddProduct.container';
// import EditRoleContainer from '../containers/admin/EditRole.container';
// import ViewRoleContainer from '../containers/admin/ViewRole.container';


const containers = {
    [USER_ADD_PRODUCT]: {
        component: <AddProductContainer />,
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
