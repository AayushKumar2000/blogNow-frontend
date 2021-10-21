import React,{useState} from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';


const SendMail = ()=>{
    const [email,setEmail] = useState('');

    const [err,setError] = useState('');


    const instance = axios.create()

 
    const getData=(event)=>{
        event.preventDefault();

   
      instance.post('/api/forgot-password/sendemail',{email} ).then(res=>{
          if(res.data.mess)
            setError(res.data.mess);
		  else if(res.data.err)
			setError(res.data.err);
		
     }
     );

    }



    return <div className="flex bg-gray-100 w-screen h-screen justify-center items-center"> 
  <div className=" flex bg-gray-100 w-2/3 h-3/4 rounded shadow-lg" >
     {/* left  */}
     <div className="flex flex-col pb-6 p-12 w-5/12 bg-white">
         <h1 className="text-xl text-gray-500 font-semibold" >Password Reset</h1>
         <h2 className="text-base text-gray-600 font-bold">You will recieve a link</h2> 
        
        
         
      <form  onSubmit={(event)=>getData(event)} className="flex flex-col mt-3 mb-3" >
        
        <label htmlFor="email">Enter Your Email</label>
        <input required value={email} onChange={(event)=>setEmail(event.target.value)} className="htmlForm-input mb-2  border-2 border-gray-200  p-1 rounded-md outline-none focus:border-purple-400" type="email" id="email"/>
        <div className="text-sm font-semibold text-red-500">{err}</div>
       <input className="cursor-pointer mt-5 p-2 rounded-sm bg-purple-700 text-white font-bold" type="submit" value="Send Link"/>
      </form>
      
      <div className="text-xs mt-auto text-gray-300">@2021 BlogNow All rights reserved.</div>
     </div>

      {/* right  */}
     <div className=" flex-1 bg-purple-500">
   
     </div>
  </div>
</div>
}

export default SendMail;