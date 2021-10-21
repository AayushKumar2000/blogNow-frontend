import React,{useState} from 'react';
import axios from 'axios';
import { Redirect } from "react-router-dom";
import googleIcon from '../static/icons8-google.svg';
import {useSetUserContext} from '../context/auth_context';
import { setHeader } from '../apis/axios_instance';




const Signin = ({match: { params }})=>{

   const [email,setEmail] = useState('');
   const [password,setPassword] = useState('');
   const [err,setError] = useState('');
   const [redirect,setredirect] = useState(null);

   const changeUser = useSetUserContext();

   



   const getData=(event)=>{
      event.preventDefault();
     console.log(email,password)
   axios.post('/api/signin',{email,password} ).then(res=>{
      console.log("res"+res.data['access-token'])
   
      if(res.status===200 && res.data['access-token']){       
        // changeAccessToken(res.data['access-token'])
       // changeUser(res.data.user)
        //setHeader(res.data['access-token'])
         setredirect('/');
      }
    else  if(res.status===200 && res.data.err){
      setError(res.data.err);
     }
   });
      
   }

   if(params.mess==='eaewep' && !err){
      setError('email already exists with email and password.\n Try to signin into that.');
   }else if(params.mess && !err)
	   setError(params.mess);

   if (redirect) {
      console.log('redirect2')

      return <Redirect to={redirect}  />
    }


    return <div className="flex bg-gray-100 w-screen h-screen justify-center items-center sm:flex-none sm:bg-white md:flex-none md:bg-white" > 
    <div className=" flex bg-gray-100 w-2/3 h-3/4 rounded shadow-lg  sm:shadow-none sm:w-full sm:h-full sm:bg-white sm:justify-center sm:mt-4  md:shadow-none md:w-full md:h-full md:bg-white md:justify-center md:mt-4" >
       {/* left  */}
       <div className="flex flex-col pb-6 p-12 w-5/12 bg-white  lg:w-1/2 xl:w-2/5   sm:p-10  sm:w-1/2 md:p-10 md:w-1/2">
           <h1 className="text-xl text-gray-500 font-semibold   " >Already have an account?</h1>
           <h2 className="text-base text-gray-600 font-bold ">Sign in here</h2> 
           <a href='http://localhost:8000/api/auth/google' className="hover:bg-purple-50 cursor-pointer mt-5 flex justify-center items-center skew-y-1 p-1 border rounded-md border-gray-300 font-normal sm:py-3">
            <img className="mr-3 w-8 h-8 sm:mr-2 sm:w-5 sm:h-5" src={googleIcon} alt="google_icon"/>
            <h4 className="font-bold sm:text-sm sm:font-semibold">Sign in with Google</h4>
           </a>
           <div className="flex flex-row items-center  mt-4">
              <div className="flex-1 border-b-2 border-gray-200  "></div>
             <div className="ml-1 mr-1 text-sm text-gray-400">or Sign in with</div>
              <div className="flex-1 border-b-2 border-gray-200  "></div>
           </div>
           
        <form  onSubmit={(event)=>getData(event)} className="flex flex-col mt-3 mb-3" >
          
          <label htmlFor="email">Email</label>
          <input required value={email} onChange={(event)=>setEmail(event.target.value)} className="htmlForm-input mb-2  border-2 border-gray-200  p-1 rounded-md outline-none focus:border-purple-400" type="email" id="email"/>
          <label htmlFor="pass">Password</label>
          <input required value={password} onChange={(event)=>setPassword(event.target.value)}  className="htmlForm-input border-2 border-gray-200  p-1 rounded-md outline-none focus:border-purple-400" type="password" id="pass"/>
          <div className="text-sm font-semibold text-red-500">{err}</div>
         <input className="cursor-pointer mt-5 p-2 rounded-sm bg-purple-700 text-white font-bold" type="submit" value="Login"/>
        </form>
        <div className=" text-sm text-gray-400">Don't have an account? <a className="text-purple-500 font-semibold" href="/signup">Sign up</a></div>
        <a className="text-sm text-purple-500 font-semibold cursor-pointer" href="/forgotPassword/sendemail" >forgot password?</a>
        <div className="text-xs mt-auto text-gray-300">@2021 BlogNow All rights reserved.</div>
       </div>
 
        {/* right  */}
       <div className="  flex-1 bg-purple-500  sm:hidden md:hidden ">
     
       </div>
    </div>
 </div>


}

export default Signin;