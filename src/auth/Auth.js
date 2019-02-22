import React, {Component} from 'react';
import {connect} from 'react-redux';
import * as userActions from 'auth/store/actions';
import {bindActionCreators} from 'redux';
import * as Actions from 'store/actions';
import firebaseService from 'firebaseService';
import auth0Service from 'auth0Service';
import { withCookies } from 'react-cookie';

class Auth extends Component {

    constructor(props)
    {
        super(props);

        /**
         * Comment the line if you do not use Auth0
         */
        auth0Service.init();

        /**
         * Comment the line if you do not use Firebase
         */
        // firebaseService.init();
    }

    componentDidMount()
    {
        this.auth0Check();
    }

    auth0Check = () => {
        this.props.setUserDataAuth0();
    };

    firebaseCheck = () => {
        firebaseService.onAuthStateChanged(authUser => {
            if ( authUser )
            {
                this.props.showMessage({message: 'Logging in with Firebase'});

                /**
                 * Retrieve user data from Firebase
                 */
                firebaseService.getUserData(authUser.uid).then(user => {

                    this.props.setUserDataFirebase(user, authUser);

                    this.props.showMessage({message: 'Logged in with Firebase'});
                })
            }
        });
    };

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
    return bindActionCreators({
            setUserDataAuth0   : userActions.setUserDataAuth0,
            setUserDataFirebase: userActions.setUserDataFirebase,
            showMessage        : Actions.showMessage,
            hideMessage        : Actions.hideMessage
        },
        dispatch);
}

export default withCookies(connect(null, mapDispatchToProps)(Auth));
