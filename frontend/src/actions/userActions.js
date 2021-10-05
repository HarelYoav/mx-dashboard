import axios from 'axios';
import {
        USER_LOGIN_FAIL,
        USER_LOGIN_REQUEST,
        USER_LOGIN_SUCCESS,
        USER_LOGOUT,
        USER_REGISTER_SUCCESS,
        USER_REGISTER_REQUEST,
        USER_REGISTER_FAIL,
        USER_UPDATE_REQUEST,
        USER_UPDATE_SUCCESS,
        USER_UPDATE_FAIL,
    } from "../constants/userConstants";


//manage the user login to the app
export const login = (email, password) => async (dispatch) => {

    try{

        dispatch({ type: USER_LOGIN_REQUEST });

        const config = {
            headers: {
                'Content-type':'application/json'
            },
        };

        const {data} = await axios.post(
            '/api/users/login',
            { email, password, },
            config
        );

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (err) {
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                err.response && err.response.data ? err.response.data : err.response,
        });
    };
};


//manage when user register directly thru the app
export const register = (name, email, password, pic) => async (dispatch) => {

    try {

        dispatch({type: USER_REGISTER_REQUEST});

        const config = {
            headers: {
                'Content-type':'application/json'
            }
        };

        const {data} = await axios.post(
            '/api/users',
            {   name,
                email,
                password,
                pic,
            },
            config
        );

        localStorage.setItem('userInfo', JSON.stringify(data));

        dispatch({ type: USER_REGISTER_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

    } catch (err) {
        dispatch({
            type: USER_REGISTER_FAIL,
            payload:
                err.response && err.response.data ? err.response.data : err.response,
        });
    };
};


//manage when user logou
export const logout = () => async (dispatch) => {
    localStorage.removeItem('userInfo');
    dispatch({type: USER_LOGOUT});
};


//manage when user register / login using his own google account
export const loginGoogle = (tokenId) => async (dispatch) => {

    try {

        dispatch({type: USER_LOGIN_REQUEST});

        const {data} = await axios.post('/api/users/google', {tokenID: tokenId});

        localStorage.setItem('userInfo', JSON.stringify(data));

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data});

    } catch (err){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                err.response && err.response.data ? err.response.data : err.response,
        });
    };
};


//manage when user register / login using his own google account
export const loginFacebook = (email, name, facebookId) => async (dispatch) => {

    try {

        dispatch({type: USER_LOGIN_REQUEST});

        const {data} = await axios.post('/api/users/facebook', {email, name, facebookId});

        localStorage.setItem('userInfo', JSON.stringify(data));

        dispatch({ type: USER_LOGIN_SUCCESS, payload: data});

    } catch (err){
        dispatch({
            type: USER_LOGIN_FAIL,
            payload:
                err.response && err.response.data ? err.response.data : err.response,
        });
    };
};


//update user profile picture
export const userUpdateProfile = (email, pic) => async (dispatch, getState) => {
    try {

        dispatch({type: USER_UPDATE_REQUEST});

        const { userLogin: {userInfo} } = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: 'bearer ' + userInfo.token
            },
        };

        const { data } = await axios.post('/api/users/profile', {email, pic}, config);

        dispatch({ type: USER_UPDATE_SUCCESS, payload: data });
        dispatch({ type: USER_LOGIN_SUCCESS, payload: data });

        localStorage.setItem('userInfo', JSON.stringify(data));

    } catch (err) {

        dispatch({
            type: USER_UPDATE_FAIL,
            payload:
                err.response && err.response.data ? err.response.data : err.response,
        });
    }
}