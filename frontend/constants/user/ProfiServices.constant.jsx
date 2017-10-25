import React from 'react';

import UserStoreContainer from '../../containers/user/profi/Sotre.container';
import UserStatisticComponent from '../../components/user/profiServices/Statistic.component';
import UserServicesComponent from '../../components/user/profiServices/Services.component';
import UserExtraOptionsComponent from '../../components/user/profiServices/ExtraOptions.component';
import UserCompanyInfoComponent from '../../components/user/profiServices/CompanyInfo.component';
import UserAdvertisingComponent from '../../components/user/profiServices/Advertising.component';

export default [
    {
        name: 'Advertising',
        component: <UserAdvertisingComponent />,
    },
    {
        name: 'Statistic',
        component: <UserStatisticComponent />,
    },
    {
        name: 'Extra options',
        component: <UserExtraOptionsComponent />,
    },
    {
        name: 'Company info',
        component: <UserCompanyInfoComponent />,
    },
    {
        name: 'Store',
        component: <UserStoreContainer />,
    },
    {
        name: 'Services',
        component: <UserServicesComponent />,
    },
];
