import axios from 'axios';


const API =  axios.create({
    baseURL: 'http://localhost:3000/api/',
});

API.interceptors.request.use(
    (request) => {
    const user = JSON.parse(localStorage.getItem('user'));
    console.log('from axios updateAuthBearer', user);
    if(user) {
        request.headers.Authorization = `Bearer ${user.token}`;
    }
    return request;
    
},(error) => {
    return error;
})

export default API;