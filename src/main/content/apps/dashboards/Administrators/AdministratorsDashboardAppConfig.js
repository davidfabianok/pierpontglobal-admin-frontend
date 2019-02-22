import {FuseLoadable} from '@fuse';

export const AdministratorsDashboardAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            auth     : ['admin'],
            path     : '/apps/dashboards/administrators',
            component: FuseLoadable({
                loader: () => import('./Administrators')
            })
        }
    ]
};
