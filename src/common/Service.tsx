import axios from "axios";
import { BookState, FloodReports, Data } from '../model/types.d';
class Service {


    static getApi(uri) {
        return new Promise<FloodReports>(function (resolve, reject) {
            axios.get<FloodReports>(uri)
                .then(res => {
                    {
                        resolve(res.data);
                    }
                }).catch(error => {
                    if (error.response) {
                        resolve(error.response);
                    } else {
                        reject(error);
                    }
                })
        });
    }

    static postApi(uri, params) {
        return new Promise(function (resolve, reject) {
            axios.post(uri, params,
                {
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    }
                })
                .then(res => {
                    {
                        resolve(res.data);
                    }
                }).catch(error => {
                    if (error.response) {
                        resolve(error.response.data);
                    } else {
                        reject(error);
                    }
                })
        });
    }

    static upImage(uri, params) {
        return new Promise(function (resolve, reject) {
            axios.post(uri, params,
                {
                    headers: { 
                        'Accept': 'application/json',
                        'Content-Type': 'multipart/form-data' },
                })
                .then(res => {
                    {
                        resolve(res.data);
                    }
                }).catch(error => {
                    console.log('cacth', error.response)
                    if (error.response) {
                        resolve(error.response);
                    } else {
                        reject(error);
                    }
                })
        });

    }
}


export default Service