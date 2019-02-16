import {FuseLoadable} from '@fuse';

export const BidsAppConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            path     : '/apps/Bids/Bid',
            component: FuseLoadable({
                loader: () => import('./Bid/Bids')
            })
        }
    ]
};
