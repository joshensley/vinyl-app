import axios from 'axios';

const instance = axios.create({
    baseURL: 'https://vinyl-app-cfa79.firebaseio.com'
});

export default instance;