import axiosAuthed from './auth.js';

export const trackService = {
    deleteTrack,
};

function deleteTrack(track) {
    const axios = axiosAuthed();
    return axios.post(`/api/v1/track/delete`, track);
}