import axios from 'axios';

export const configuration = () => {
    axios.defaults.baseURL = process.env.REACT_APP_BASEURL;
    axios.defaults.headers.common.Authorization = localStorage.getItem('country');
    axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
};