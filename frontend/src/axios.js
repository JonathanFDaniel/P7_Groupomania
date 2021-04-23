import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));
const token = user.token

if (token == null) {
    this.$router.push('/signin');
}

const API = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        authorization: 'bearer ' + token
    }
})

export default API