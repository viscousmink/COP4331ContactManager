import React from 'react';

import PageTitle from '../components/PageTitle';
import LoggedInName from '../components/LoggedInName';
import AccessUI from '../components/AccessUI';


const AccessContactsPage = () =>
{
    return(
        <div>
            <PageTitle />
            <LoggedInName />
            <AccessUI />
        </div>
    );
}

export default AccessContactsPage;