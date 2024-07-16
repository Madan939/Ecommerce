import { createContext, useEffect, useState } from "react";
//import { APIROUTE } from "../components/Commonroute";
export const Authcontext=createContext();
export const AuthProvider=({children})=>{

    const [user,setUser]=useState(null);
    useEffect(()=>{
        const userInfo=JSON.parse(localStorage.getItem('User'));
        // console.log(userInfo)
        if(userInfo){
            setUser(userInfo);
        }
    },[])
    const logOut=()=>{
        setUser(null)
        localStorage.removeItem('User')
        
    }
    const getToken=()=>{
        const user=JSON.parse(localStorage.getItem('User'));
        return user?(user.token):(null)
    }
    return (
        <Authcontext.Provider value={{user,logOut,getToken}}>
            {children}
        </Authcontext.Provider>
        
    )
}