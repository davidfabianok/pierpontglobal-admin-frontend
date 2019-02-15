import React, {Component} from 'react';
import {matchRoutes} from 'react-router-config';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import _ from '@lodash';
import { withCookies, Cookies } from 'react-cookie';
import axios from 'axios/index';

import { instanceOf } from 'prop-types';

let redirect = false;

class FuseAuthorization extends Component {

    static propTypes = {
        cookies: instanceOf(Cookies).isRequired
    };

    constructor(props)
    {
        const { cookies } = props;
        super(props);


        if (cookies.get('token')) {
            console.log(cookies.get('token'));
            axios.interceptors.request.use((config) => {
                config.headers = { Authorization: `Bearer ${cookies.get('token')}` };
        
                return config;
            }, error => Promise.reject(error));
        }

        this.checkAuth();
    }

    componentDidUpdate(prevProps)
    {
        /**
         * If route is changed
         * Update auths
         */
        if ( !_.isEqual(this.props.location.pathname, prevProps.location.pathname) )
        {
            this.checkAuth();
        }
    }

    checkAuth()
    {
        if (this.props.history.location.pathname == '/'){
            this.props.history.push({
                pathname: '/apps/dashboards/analytics',
                state   : {redirectUrl: this.props.location.pathname}
            });
        };
        const matched = matchRoutes(this.props.routes, this.props.location.pathname)[0];
        if ( matched && matched.route.auth && matched.route.auth.length > 0 )
        {
            redirect = true;
            if ( ! matched.route.auth.includes(this.props.cookies.get('role')) )
            {
                this.props.history.push({
                    pathname: '/login',
                    state   : {redirectUrl: this.props.location.pathname}
                });
            }
        }
    }

    shouldComponentUpdate(nextProps)
    {
        if ( redirect )
        {
            redirect = false;
            return false;
        }
        else
        {
            return true;
        }
    }

    render()
    {
        const {children} = this.props;

        return (
            <React.Fragment>
                {children}
            </React.Fragment>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({}, dispatch);
}

function mapStateToProps({fuse, auth})
{
    return {
        user: auth.user
    }
}

export default withCookies(withRouter(connect(mapStateToProps, mapDispatchToProps)(FuseAuthorization)));
