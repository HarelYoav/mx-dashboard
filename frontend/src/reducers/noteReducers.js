import {NOTE_LIST_FAIL,
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

export const noteListReducer = (state={}, action) => {
    switch (action.type) {

        case NOTE_LIST_REQUEST:
            return {loading: true};

        case NOTE_LIST_SUCCESS:
            return {loading: false, notes: action.payload};

        case NOTE_LIST_FAIL:
            return {loading: false, error: action.payload};

        default:
            return state;
    }
};


export const addNewNoteReducer = (state ={}, action) => {
    switch (action.type) {

        case ADD_NOTE_REQUEST:
            return {loading: true};

        case ADD_NOTE_SUCCESS:
            return {loading: false, note: action.payload};

        case ADD_NOTE_FAIL:
            return {loading: false, error: action.payload};

        default:
            return state;
    }
};

export const noteUpdateReducer = (state ={}, action) => {
    switch (action.type) {

        case NOTE_UPDATE_REQUEST:
            return {loading: true};

        case NOTE_UPDATE_SUCCESS:
            return {loading: false, note: action.payload};

        case NOTE_UPDATE_FAIL:
            return {loading: false, error: action.payload};

        default:
            return state;
    }
};

export const noteDeleteReducer = (state ={}, action) => {
    switch (action.type) {

        case NOTE_DELETE_REQUEST:
            return {loading: true};

        case NOTE_DELETE_SUCCESS:
            return {loading: false, note: action.payload};

        case NOTE_DELETE_FAIL:
            return {loading: false, error: action.payload};

        default:
            return state;
    }
};

export const publicNotesReducer = (state ={}, action) => {
    switch (action.type) {

        case NOTE_PUBLIC_LIST_REQUEST:
            return {loading: true};

        case NOTE_PUBLIC_LIST_SUCCESS:
            return {loading: false, notes: action.payload};

        case NOTE_PUBLIC_LIST_FAIL:
            return {loading: false, error: action.payload};

        default:
            return state;
    }
};