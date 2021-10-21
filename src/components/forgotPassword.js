import React,{useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


const ForgotPassword = ({match: { params }})=>{
    const [password,setPassword] = useState('');
    const [password2,setPassword2] = useState('');
    const [redirect,setredirect] = useState(null);
    const [err,setError] = useState('');


    const instance = axios.create()

 
    const getData=(event)=>{
        event.preventDefault();

     if(password===password2){
      instance.post('/api/forgot-password/reset',{password,token: params.token} ).then(res=>{
       if(res.status===200 && res.data.mess)
        setredirect(`/signin/${res.data.mess}`)
	   else if(res.status===200 && res.data.err)
		 setError(res.data.err)
		   
     }
     )
    }else
      setError('Both password do not match')

    }

    if (redirect) {
        return <Redirect to={redirect} />
      }


    return <div className="flex bg-gray-100 w-screen h-screen justify-center items-center"> 
  <div className=" flex bg-gray-100 w-2/3 h-3/4 rounded shadow-lg" >
     {/* left  */}
     <div className="flex flex-col pb-6 p-12 w-5/12 bg-white">
         <h1 className="text-xl text-gray-500 font-semibold" >Forgot Password</h1>
         <h2 className="text-base text-gray-600 font-bold">Reset password</h2> 
        
         
      <form  onSubmit={(event)=>getData(event)} className="flex flex-col mt-3 mb-3" >
        
        <label htmlFor="pass2">New Password</label>
        <input required value={password} onChange={(event)=>setPassword(event.target.value)} className="htmlForm-input mb-2  border-2 border-gray-200  p-1 rounded-md outline-none focus:border-purple-400" type="password" id="pass2"/>
        <label htmlFor="pass">Type Password Again</label>
        <input required value={password2} onChange={(event)=>setPassword2(event.target.value)}  className="htmlForm-input border-2 border-gray-200  p-1 rounded-md outline-none focus:border-purple-400" type="password" id="pass"/>
        <div className="text-sm font-semibold text-red-500">{err}</div>
       <input className="cursor-pointer mt-5 p-2 rounded-sm bg-purple-700 text-white font-bold" type="submit" value="Set Password"/>
      </form>
      
      <div className="text-xs mt-auto text-gray-300">@2021 BlogNow All rights reserved.</div>
     </div>

      {/* right  */}
     <div className=" flex-1 bg-purple-500">
   
     </div>
  </div>
</div>
}

export default ForgotPassword;