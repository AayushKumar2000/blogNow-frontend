import react,{useEffect,useState} from 'react';
import { Redirect } from "react-router-dom";
import { instance } from '../apis/axios_instance';
import {useUserContext} from '../context/auth_context';


const Home = ()=>{
const [user,setUser] = useState(null);
const [redirect,setredirect] = useState(null);


const currentUser = JSON.parse(localStorage.getItem('user'));

     const route=()=>{
          instance.get('/api/test')
     }

     const logout=()=>{
          instance.get('/api/logout').then((res)=>{
               setredirect('/signin')

          })
     }

     if (redirect) {
          console.log('redirect2')
    
          return <Redirect to={redirect} />
        }
    
     return <div>
          <div>Home</div>
          <div>user: {currentUser?currentUser.email:''}</div>
         
          <button onClick={()=>route()}>route</button><br/>
          <button onClick={()=>logout()}>Logout</button>
     </div>
}

export default Home;