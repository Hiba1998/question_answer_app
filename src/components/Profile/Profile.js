import React from 'react';
import Container from '@mui/material/Container';
import {Link,Route} from 'react-router-dom';
import {Stack,MenuList,MenuItem,Paper} from '@mui/material';
import MyAnswers from '../Answers/MyAnswers'
import MyQuestions  from '../Questions/MyQuestions';
import MyProfile from '../MyProfile';
const Profile = () => {
  return (
    <Container>
        <Stack direction="row" spacing={5} mt={2}>
        <Paper style={{height:'120px'}}>
            <MenuList>
              <MenuItem><Link style={{textDecoration:'none'}} to="/profile/myprofile">Profile</Link></MenuItem>
              <MenuItem><Link style={{textDecoration:'none'}} to="/profile/myquestions">My Questions</Link></MenuItem>
              <MenuItem><Link style={{textDecoration:'none'}} to="/profile/myanswers">My answers</Link></MenuItem>
            </MenuList>
        </Paper>
          <Route path="/profile/myprofile" component={MyProfile}/>
          <Route path="/profile/myquestions" component={MyQuestions}/>
          <Route path="/profile/myanswers" component={MyAnswers}/>
        </Stack>
    </Container>
  );
};

export default Profile;