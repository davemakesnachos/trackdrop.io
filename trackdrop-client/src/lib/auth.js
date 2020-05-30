import axios from 'axios';

export default function axiosAuthed(extraOptions = {}) {
    const config = {
        headers: {
            ...authHeader(),
            accept: 'application/json'
        },
        ...extraOptions
    }

    return axios.create(config);
}

export const authHeader = () => {
    const user = JSON.parse(localStorage.getItem('user'));

    let authHeader = {}

    if ((user && user.token))
        authHeader = {'Authorization': 'Bearer ' + user.token}

    return authHeader;
}

