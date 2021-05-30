import axios from 'axios';
import router from './router';

const user = JSON.parse(localStorage.getItem('user'));

let userToken;

if (user == null) {
    router.push('/signin');
    userToken = null;
} else {
    userToken = user.token;
}

const token = userToken;

const API = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        authorization: 'bearer ' + token 
    }
})

export default API