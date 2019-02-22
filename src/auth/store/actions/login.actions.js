import axios from 'axios/index';
import firebaseService from 'firebaseService';
import {setUserDataAuth0} from 'auth/store/actions/user.actions';
import * as Actions from 'store/actions';
import { ApiServer } from '../../../Defaults';

export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';

export function submitLogin({username, password, cookies})
{
    const request = axios.post(`${ApiServer}/oauth/token`, {
            username,
            password,
            grant_type: "password"
    });
    return (dispatch) =>
        request.then((response) => {
            if ( !response.data.error )
            {
                cookies.set('token', response.data.access_token, {path: '/'})
                cookies.set('role', 'admin', {path: '/'})

                if (cookies.get('token')) {
                    axios.interceptors.request.use((config) => {
                        config.headers = { Authorization: `Bearer ${cookies.get('token')}` };
                
                        return config;
                    }, error => Promise.reject(error));

                    axios.interceptors.response.use(response => response,
                        (error) => {
                          if (error.response.status === 401) {
                            cookies.remove('token');
                            cookies.remove('role')
                            window.location.href = '/login';
                          }
                          return Promise.reject(error);
                        });
                }

                dispatch(setUserDataAuth0());
                return dispatch({
                    type: LOGIN_SUCCESS
                });
            }
            else
            {
                return dispatch({
                    type   : LOGIN_ERROR,
                    payload: response.data.error
                });
            }
        });
}

export function loginWithFireBase({username, password})
{
    return (dispatch) =>
        firebaseService.auth && firebaseService.auth.signInWithEmailAndPassword(username, password)
            .then(() => {
                return dispatch({
                    type: LOGIN_SUCCESS
                });
            })
            .catch(error => {
                const usernameErrorCodes = [
                    'auth/email-already-in-use',
                    'auth/invalid-email',
                    'auth/operation-not-allowed',
                    'auth/user-not-found',
                    'auth/user-disabled'
                ];
                const passwordErrorCodes = [
                    'auth/weak-password',
                    'auth/wrong-password'
                ];

                const response = {
                    username: usernameErrorCodes.includes(error.code) ? error.message : null,
                    password: passwordErrorCodes.includes(error.code) ? error.message : null
                };

                if ( error.code === 'auth/invalid-api-key' )
                {
                    dispatch(Actions.showMessage({message: error.message}));
                }

                return dispatch({
                    type   : LOGIN_ERROR,
                    payload: response
                });
            });
}
