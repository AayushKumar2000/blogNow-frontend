import React,{useEffect,useState} from "react";
import { Redirect, Route } from "react-router-dom";

import { instance } from '../apis/axios_instance';


const ProtectedRoute = ( {component: Component, ...restOfProps }) => {
const [isAuthenticated,setisAuthenticated] = useState(null);

 useEffect(()=>{

    console.log(getCookie('user'))
    const user = getCookie('user');
    if(user)
     localStorage.setItem("user", user);

     instance.get('/api/checkAuth').then(res=>{
           console.log(res.data)
             if(res.status===200)
              setisAuthenticated( res.data.logedIn);
        })
 },[]);

 
function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(';');
  for(let i = 0; i <ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return null;
}
    
  if(isAuthenticated==null)
   return <div>Loading....</div>
    
    return (
      <Route 
        {...restOfProps}
        render={(props) =>
          isAuthenticated ? <Component {...props} /> : <Redirect to="/signin" />
        }
      />
    );

}

export default  ProtectedRoute;