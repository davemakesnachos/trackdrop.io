import { userConstants } from '../constants';

const userState = JSON.parse(localStorage.getItem('user'));

const defaultState = (userState
    ? { ...userState, logged_in: true }
    : {
        logged_in: false,
        token: '',
        name: ''
    })

export function user(state = defaultState, action) {
    switch (action.type) {
        case userConstants.LOGIN:
            return {
                logged_in: true,
                token: action.payload.token,
                name: action.payload.name,
            };
        case userConstants.LOGOUT:
            return {
                logged_in: false,
                token: '',
                name: ''
            };
        default:
            return state
    }
}
