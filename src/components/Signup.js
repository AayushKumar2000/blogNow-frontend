import axios from 'axios';
import React,{useState} from 'react';
import { Redirect } from "react-router-dom";
import googleIcon from '../static/icons8-google.svg';

const Signup = ()=>{
   const [name,setName] = useState('');
   const [email,setEmail] = useState('');
   const [password,setPassword] = useState('');
   const [redirect,setredirect] = useState(null);
   const [err,setError] = useState('');



   const instance = axios.create()

   const getData=(event)=>{
      event.preventDefault();
    
     
   instance.post('/api/signup',{ name,email,password} ).then(res=>{
      console.log(res.data)
      if(res.status===200 && res.data.mess==='user added')
       setredirect('/signin')
      else if(res.status===200 && res.data.err){
          setError(res.data.err);
      }
   });
      
   }

   if (redirect) {
      return <Redirect to={redirect} />
    }

   return <div className="flex bg-gray-100 w-screen h-screen justify-center items-center"> 
   <div className=" flex bg-gray-100 w-2/3 h-3/4 rounded shadow-lg" >
  
      <div className="flex flex-col pb-6 p-12 w-5/12 bg-white">
          <h1 className="text-2xl text-gray-600 font-bold" >Create Account</h1>
        
          <div  className=" bg-purple-400 cursor-pointer mt-5 flex justify-center items-center skew-y-1 p-1 border rounded-md border-gray-300 font-normal">
          <img className="mr-3 w-8 h-8" src={googleIcon} alt="google_icon"/>
           <h4 className="font-medium text-white">Sign up with Google</h4>
          </div>
          <div className="flex flex-row items-center  mt-4">
             <div className="flex-1 border-b-2 border-gray-200  "></div>
            <div className="ml-1 mr-1 text-sm text-gray-400">or Sign up with</div>
             <div className="flex-1 border-b-2 border-gray-200  "></div>
          </div>
          
       <form  onSubmit={(event)=>getData(event)} className="flex flex-col mt-3 mb-3" >
         <label htmlFor="username">Name</label>
         <input required value={name} onChange={(event)=>setName(event.target.value)} className="htmlForm-input mb-2  border-2 border-gray-200 p-1 rounded-md outline-none focus:border-purple-400" type="text" id="username"/>
         <label htmlFor="email">Email</label>
         <input required  value={email} onChange={(event)=>setEmail(event.target.value)} className="htmlForm-input mb-2  border-2 border-gray-200 p-1 rounded-md outline-none focus:border-purple-400" type="email" id="email"/>
         <label htmlFor="pass">Password</label>
         <input required value={password} onChange={(event)=>setPassword(event.target.value)} className=" htmlForm-input border-2 border-gray-200 p-1 rounded-md outline-none focus:border-purple-400" type="password" id="pass"/>
         <div className="text-sm font-semibold text-red-500">{err}</div>

         <div className="flex mt-3 items-center">
           <input required  className="htmlForm-checkbox w-4 h-4 rounded-sm text-purple-400 focus:ring-purple-600" type="checkbox" name="privacycheck" id="privacycheck"/>
           <label className="  ml-2  text-sm " htmlFor="privacycheck">I agree to all the <strong className="text-purple-500">Terms</strong> and <strong className="text-purple-500">Privacy Policy</strong>.</label>
         </div>
        
         <input className="cursor-pointer mt-5 p-2 rounded-sm bg-purple-700 text-white font-bold" type="submit" value="Sign up" />
       </form>
    

       <div className="text-xs mt-auto text-gray-300">@2021 BlogNow All rights reserved.</div>
      </div>

     
      <div className=" flex-1 bg-purple-300">
    
      </div>
   </div>
</div>
}

export default Signup;