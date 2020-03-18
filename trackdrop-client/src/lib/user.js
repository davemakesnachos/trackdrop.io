import axiosAuthed from './auth.js';

export const userService = {
    login,
    logout,
    register,
    checkCode,
    forgotPassword
};

function login(userAuthCredentials) {
    const axios = axiosAuthed();
    return axios.post(`/api/v1/login`, userAuthCredentials);
}

function logout() {
    const axios = axiosAuthed();
    return axios.get(`/api/v1/logout`, {});
}

function register(user) {
    const axios = axiosAuthed();
    return axios.post(`/api/v1/user/register`, user);
}

function checkCode(code) {
    const axios = axiosAuthed();
    return axios.post(`/api/v1/invite/validate`, code);
}

function forgotPassword(email) {
    const axios = axiosAuthed();
    return axios.post(`/api/v1/forgot_password`, email);
}