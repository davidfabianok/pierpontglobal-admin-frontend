import {FuseLoadable} from '@fuse';

export const BidsPageConfig = {
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
