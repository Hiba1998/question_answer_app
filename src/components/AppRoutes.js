import React from 'react';
import { Route,Switch } from 'react-router-dom';
import SignIn from './SignIn';
import QuestionsList from './Questions/QuestionsList';
import SignOut from './SignOut';
import AnswersList from './Answers/AnswersList';
import Profile from './Profile/Profile';
import Layout from './Layout/Layout';
import {ThemeProvider,createTheme} from '@mui/material/styles';
//import AuthContext from '../store/auth-context';
const AppRoutes = () => {
   //const authCtx =  useContext(AuthContext);
   const theme = createTheme({
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            fontSize: "12px",
            textTransform: 'none',
            padding: "10px 10px",
            borderRadius: 20,
          },
        },
        defaultProps:{
          variant: 'contained',
        }
      },
      MuiLink: {
        styleOverrides: {
          root: {
            textDecoration :'none',
          },
        },
      },
      MuiToolbar: {
        styleOverrides: {
          root:{
            justifyContent:'flex-end',
          }
        }
      },
      MuiList:{
        styleOverrides:{
          root:{
            width: '100%', 
          },
        },
      },
      MuiAvatar:{
        styleOverrides:{
          root:{
            backgroundColor: '#2196f3'
          }
        }
      }
    },
  

   });
  return (
  <ThemeProvider theme={theme}>
    <Switch>
        <Route exact path="/" component={SignIn}/>
        <Route path="/signin" component={SignIn}/>
        <Route path="/signout" component={SignOut}/>
        <Layout>
          <Route exact path="/questions" component={QuestionsList}/>
          <Route path="/questions/:questionId" component={AnswersList}/>
          <Route path="/profile" component={Profile}/>
        </Layout>
        {/* <Route path='*' component={NotFound}></Route> */}
    </Switch>
    </ThemeProvider>
  );
};

export default AppRoutes;