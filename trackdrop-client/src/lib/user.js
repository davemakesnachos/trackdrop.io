import axios from 'axios';

export const userService = {
    login,
    logout,
    register,
};

function login(userAuthCredentials) {
    return axios.post(`/api/v1/login`, userAuthCredentials);
}

function logout() {
    return axios.post(`/api/v1/logout`, {});
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return axios.post(`/api/v1/user/register`, user);
}
