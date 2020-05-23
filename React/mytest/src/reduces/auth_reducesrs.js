import {AUTH_FAILED, AUTH_SUCCESS } from '../actions/types';

const INITIAL_STATE = {
    attempting: false,
    isAuth: false,
    profile: {},
    error: null
}

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case AUTH_SUCCESS:
            return { ...state, attempting: false, isAuth: true, error: null };
        case AUTH_FAILED:
            return { ...state, attempting: false, isAuth: false, error: action.payload };
        default:
            return state;
    }
}