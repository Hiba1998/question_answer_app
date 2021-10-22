import React,{useState} from 'react';

const AuthContext = React.createContext(
    {
        token:'',
        userId:'',
        isLoggedIn:false,
        login:(token,userId) =>{},
        logout:()=>{},

    }
);

 export const AuthContextProvider =(props) =>{
    //const initialToken = localStorage.getItem('token');
    // add initialtoken to useState
    const [token,setToken] = useState();
    const [userId,setUserId] = useState();
    const userIsLoggedIn = !!token;

    const loginHandler = (token,userId) =>{
        setToken(token);
        setUserId(userId);
       // localStorage.setItem('token',token);
    };
    const logoutHandler = () =>{
        setToken(null);
        setUserId(null);
        //localStorage.removeItem('token');
    };

    const contextValue ={
        token: token,
        userId: userId,
        isLoggedIn: userIsLoggedIn,
        login:loginHandler,
        logout:logoutHandler
    };

    return <AuthContext.Provider value={contextValue}>{props.children}</AuthContext.Provider>;
};
export default AuthContext;