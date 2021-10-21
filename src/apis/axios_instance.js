import axios from 'axios';
import axiosRetry from 'axios-retry';


let instance = axios.create({   
    baseURL:'http://localhost:8000',
    withCredentials:true
});



instance.interceptors.response.use((response)=>{
 return response; // execute when status code 2xx
},(err)=>{
    // execute when status code is not 2xx
    const currentUser = JSON.parse(localStorage.getItem('user'));
    console.log(currentUser)
    if(err.response.status===403 && currentUser ){
       
     
        instance.get('/api/getAccessToken',{params:{user: currentUser.email}}).then((res)=>{
            instance.defaults.headers.common['Authorization'] = 'Bearer '+res.data['access-token'];
          //  err.config.headers['Authorization'] = 'Bearer '+res.data['access-token'];
          //  return axios.request(err.config)
        })
    }
    if(err.response.status===401 ||  !currentUser){
        window.location = '/signin'
    }
  //  return err
  return Promise.reject(err);
})

axiosRetry(instance, {retries: 3,shouldResetTimeout: true, retryCondition	: (error)=>{
	return error.response && error.response.status === 403 ;


}, retryDelay: (retryCount=3) => {
                    return retryCount * 1000;
                }});



 function setHeader  (token){

     console.log(token)
    instance.defaults.headers.common['Authorization'] = 'Bearer '+token;
} 


export  {instance,setHeader};