import axios from 'axios';

const user = JSON.parse(localStorage.getItem('user'));

if (user === null) {
    this.$router.push('/signin');
}

const token = user.token

const API = axios.create({
    baseURL: 'http://localhost:3000/api/',
    headers: {
        authorization: 'bearer ' + token
    }
})

export default API