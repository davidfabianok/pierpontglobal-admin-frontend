import {FuseLoadable} from '@fuse';

export const ProfilePageConfig = {
    settings: {
        layout: {
            config: {}
        }
    },
    routes  : [
        {
            auth     : ['admin'],
            path     : '/pages/profile',
            component: FuseLoadable({
                loader: () => import('./ProfilePage')
            })
        }
    ]
};
