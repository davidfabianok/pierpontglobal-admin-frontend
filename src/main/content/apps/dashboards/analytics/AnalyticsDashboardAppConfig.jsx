import {FuseLoadable} from '@fuse';

export const AnalyticsDashboardAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            auth     : ['admin'],
            path     : '/apps/dashboards/analytics',
            component: FuseLoadable({
                loader: () => import('./AnalyticsDashboardApp')
            })
        }
    ]
};
