
const API_URL = "https://weatherdbi.herokuapp.com/data/weather";

const Fetch= (endpoint,data,method = 'GET') =>{

    const url = `${API_URL}/${endpoint}`;

    if ( method=== 'GET' ){
        return fetch(url)
    }else{
        return fetch(url,{
            method,
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(data)
        })
    }
}


export {
    Fetch
}