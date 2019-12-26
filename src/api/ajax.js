import axios from "axios";

export default ajax = (url,data = {},type = 'GET') => {
    switch(type){
        case 'GET':{
            return axios.get(url,{
                params:data
            })
        };
        case 'POST':{
            return axios.post(url,data);
        }
    }
}
