import axios from 'axios';

export const api_addOrder = (req) => {
    console.log(req)
    const token = localStorage.getItem('honey_token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios({
        headers: {
            'content-type': 'application/json'
        },
        method: 'post',
        url: `http://localhost:3400/api/myroutes/Order`,
        data: {
            order: req,
        }
    });
    
}
export const api_orderList = (req) => {
    console.log(req)
    const token = localStorage.getItem('honey_token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios({
        headers: {
            'content-type': 'application/json'
        },
        method: 'get',
        url: `http://localhost:3400/api/myroutes/Order/${req.user_id}`,
    });
    
}

export const api_orderUpdate = (req) => {
    console.log(req)
    const token = localStorage.getItem('honey_token');
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    return axios({
        headers: {
            'content-type': 'application/json'
        },
        method: 'put',
        url: `http://localhost:3400/api/myroutes/Order/${req._id}`,
        data: {
            order: req
        }
    });
    
}