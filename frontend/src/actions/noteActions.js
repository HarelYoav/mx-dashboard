import axios from 'axios';
import {
        NOTE_LIST_FAIL,
        NOTE_LIST_REQUEST,
        NOTE_LIST_SUCCESS,
        ADD_NOTE_REQUEST,
        ADD_NOTE_SUCCESS,
        ADD_NOTE_FAIL,
        NOTE_UPDATE_REQUEST,
        NOTE_UPDATE_SUCCESS,
        NOTE_UPDATE_FAIL,
        NOTE_DELETE_REQUEST,
        NOTE_DELETE_SUCCESS,
        NOTE_DELETE_FAIL,
        NOTE_PUBLIC_LIST_REQUEST,
        NOTE_PUBLIC_LIST_SUCCESS,
        NOTE_PUBLIC_LIST_FAIL,
    } from '../constants/noteConstants'


export const userNoteList = () => async (dispatch, getState) => {

    try {

        dispatch({ type: NOTE_LIST_REQUEST });

        const { userLogin: { userInfo }} = getState();

        const config = {
            headers: {
                authorization: 'bearer ' + userInfo.token
            },
        };

        const { data } = await axios.get('/api/notes', config);

        dispatch({ type: NOTE_LIST_SUCCESS, payload: data });

    } catch (err) {

        dispatch({
            type: NOTE_LIST_FAIL,
            payload:
                err.response && err.response.data ? err.response.data : err.response,
        });
    }
};


export const addNote = (title, content, isPrivate) => async (dispatch, getState) => {

    try {

        dispatch({ type: ADD_NOTE_REQUEST });

        const { userLogin: { userInfo }} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: 'bearer ' + userInfo.token
            },
        };

        const { data } = await axios.post(
            '/api/notes/create',
            { title, content, isPrivate },
            config,
        );

        dispatch({ type: ADD_NOTE_SUCCESS, payload: data });

    } catch (err) {

        dispatch({
            type: ADD_NOTE_FAIL,
            payload:
                err.response && err.response.data ? err.response.data : err.response,
        });
    }
};


export const updateNote = (id, title, content, isPrivate) => async (dispatch, getState) => {

    try {

        dispatch({ type: NOTE_UPDATE_REQUEST});

        const { userLogin: { userInfo }} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: 'bearer ' + userInfo.token
            },
        };

        const {data} = await axios.put(
            '/api/notes/'+ id,
            {title, content, isPrivate},
            config
        );

        dispatch({type: NOTE_UPDATE_SUCCESS, payload: data});


    }   catch (err) {

        dispatch({
            type: NOTE_UPDATE_FAIL,
            payload:
                err.response && err.response.data ? err.response.data : err.response,
        });
    }
};


export const deleteNote = (id) => async(dispatch, getState) => {

    try {

        dispatch({ type: NOTE_DELETE_REQUEST});

        const { userLogin: { userInfo }} = getState();

        const config = {
            headers: {
                'Content-Type': 'application/json',
                authorization: 'bearer ' + userInfo.token
            },
        };

        const {data} = await axios.delete(
            '/api/notes/'+ id,
            config
        );

        dispatch({type: NOTE_DELETE_SUCCESS, payload: data});


    } catch (err) {

        dispatch({
            type: NOTE_DELETE_FAIL,
            payload:
                err.response && err.response.data ? err.response.data : err.response,
        });
    }
};


export const publicNotesList = () => async (dispatch, getState) => {
    try {
        dispatch({ type: NOTE_PUBLIC_LIST_REQUEST});

        const { userLogin: { userInfo }} = getState();

        const config = {
            headers: {
                authorization: 'bearer ' + userInfo.token
            },
        };

        const {data} = await axios.get(
            '/api/notes/public',
            config
        );

        dispatch({type: NOTE_PUBLIC_LIST_SUCCESS, payload: data});


    } catch (err) {
        dispatch({
            type: NOTE_PUBLIC_LIST_FAIL,
            payload:
                err.response && err.response.data ? err.response.data : err.response,
        });
    }
};