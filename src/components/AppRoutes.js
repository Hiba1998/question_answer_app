import React from 'react';
import { Route,Switch } from 'react-router-dom';
import SignIn from './SignIn';
import QuestionsList from './Questions/QuestionsList';
import SignOut from './SignOut';
import AnswersList from './Answers/AnswersList';
import Profile from './Profile/Profile';
import Layout from './Layout/Layout';
//import AuthContext from '../store/auth-context';
const AppRoutes = () => {
   //const authCtx =  useContext(AuthContext);
      
  return (
  
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
  );
};

export default AppRoutes;