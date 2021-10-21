import React,{useContext,useState,createContext} from 'react';

const UserContext = createContext()
const SetUserContext = createContext()


export function useUserContext (){
    return useContext(UserContext);
}

export function useSetUserContext (){
    return useContext(SetUserContext);
}

export function AuthProvider ({children}){

    const [currentUser,setCurrentUser] = useState(null);
  // const [accessToken, setAccessToken] = useState(null);

   const changeUserContext=(token)=>{
    setCurrentUser(token);
   }

 return <UserContext.Provider value={currentUser} >
          <SetUserContext.Provider value={changeUserContext}>
            {children}
          </SetUserContext.Provider >
        </UserContext.Provider>
    


} 

