import {createContext} from 'react'
export const AuthContext=createContext(
    {
        isloggedin:false,
        userid:null,
        token:null,
        login:()=>{},
        logout:()=>{}
    }
)