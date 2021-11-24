import React, { useContext } from 'react';
import { NavLink,useHistory} from 'react-router-dom';
import {AppBar,Button,Toolbar} from '@mui/material';
import AuthContext from '../../store/auth-context';

const MainNav = () => {
    const authCtx = useContext(AuthContext);
    const history = useHistory();
    //const isLoggedIn = authCtx.isLoggedIn;
    const logoutHandler = () =>{
        authCtx.logout();
        history.replace('/');
        
    };

  return (
    <AppBar position="static">
      <Toolbar>
          <NavLink to="/questions"  style={{textDecoration:'none',color:'white',paddingLeft:30,paddingRight:30}} >Questions</NavLink>
          <NavLink to="/profile" style={{textDecoration:'none',color:'white',paddingLeft:30,paddingRight:30}}>Profile</NavLink>
          <Button color="inherit" onClick={logoutHandler} style={{  fontSize: "12px",borderRadius: 20,backgroundColor: "#21b6ae"}}>Log Out</Button>
      </Toolbar>
    </AppBar>
  );
};

export default MainNav;