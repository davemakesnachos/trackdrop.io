import { userConstants } from '../constants';

export const userActions = {
    login,
    logout,
};

function login(user) {
    return { type: userConstants.LOGIN, payload: user };
}

function logout() {
    return { type: userConstants.LOGOUT };
}