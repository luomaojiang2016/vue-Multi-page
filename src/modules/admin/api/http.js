import axios from "axios";
import router from "../router/index.js";

const NeedNoTokenAPIs = [
    '/api/admin/login/'
];

axios.interceptors.request.use(
    (config) => {
        for (const item of NeedNoTokenAPIs){
            if (config.url.includes(item)){
                return config;
            }
        }

        const token = sessionStorage.getItem("adminToken");
        if (token) {
            config.headers.accesstoken = token;
        } else {
            router.push("/login");
        }
        return config;
    },
    
    (error) => {
        return Promise.reject(error);
    }
);

axios.interceptors.response.use(
    (response) => {
        return response;
    },

    (error) => {
        return Promise.reject(error);
    }
);

export default {
    get(url, params) {
        return new Promise((resolve, reject) => {
            axios.get(url, params)
            .then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    post(url, params) {
        return new Promise((resolve, reject) => {
            axios.post(url, params)
            .then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    put(url, params) {
        return new Promise((resolve, reject) => {
            axios.put(url, params)
            .then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    },

    del(url, params) {
        return new Promise((resolve, reject) => {
            axios.delete(url, params)
            .then(response => {
                resolve(response.data);
            }).catch(error => {
                reject(error);
            });
        });
    }
};
