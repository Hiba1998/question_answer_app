import React,{useState,useContext} from 'react';
import {useHistory,Link} from 'react-router-dom';
import {Avatar,TextField,Grid,Box,Typography,Container} from '@mui/material';
import { grey } from '@mui/material/colors';
import AuthContext from '../store/auth-context';
import LogButton from './UI/LogButton';
import ErrorAlert from './UI/ErrorAlert';


const SignIn = () => {
    const greyColor = grey.A700;
    const [enteredEmail,setenteredEmail] = useState('');
    const [enteredPassword,setenteredPassword] = useState('');
    const history = useHistory();
    const authCtx = useContext(AuthContext);
    const [error,setError] = useState(null);
    const [open, setOpen] = useState(false);

   
  
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    const EmailChangeHandle = (event) =>{
      setenteredEmail(event.target.value);
    };
    const PasswordChangeHandle = (event) =>{
      setenteredPassword(event.target.value);
    };
    const submitHandle = (event) => {
      event.preventDefault();
      
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyB0Pbf1tXqpx_b33caI4A3mrm7Y2LG9dEs',
      {
        method:'POST',
        body: JSON.stringify({
          email : enteredEmail,
          password :enteredPassword,
          returnSecureToken: true
        }),
        headers :{
          'Content-Type': 'application/json'
        }
      }
      ).then(response => {
        if(response.ok){
          return response.json().then((data) => {
            authCtx.login(data.idToken,data.localId);
            history.replace('/questions');
          });
        }
        else{
         return  response.json().then(data => {
           let errorMessage = 'Authentication failed';
           if(data && data.error.message){
            errorMessage = data.error.message;
          }
          throw new Error(errorMessage);
          });
        }
      }
     ).catch(err =>{
       setError(err.message);
       setOpen(true);
     });
    };
  return (
      <Container maxWidth="xs">
        {error && <ErrorAlert errorText={error} open={open} autoHideDuration={3000} handleClose={handleClose} />}
          <Box  sx={{
            marginTop: 10,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            
          }}>
          <Avatar sx={{ m: 1, bgcolor: 'success.light' }} />
            
          <Typography component="h1" variant="h5">Sign in </Typography>
          <Box component="form" onSubmit={submitHandle} sx={{ mt: 2 }}>
            <TextField
              margin="normal"
              fullWidth
              label="Email Address"
              autoComplete="email"
              size ="normal"
              autoFocus
              helperText="Please enter your email"
              onChange = {EmailChangeHandle}
            />
            <TextField
              margin="normal"
              fullWidth
              label="Password"
              type="password"
              autoComplete="current-password"
              size ="normal"
              helperText="Please enter your password"
              onChange = {PasswordChangeHandle}
            />
           <LogButton sign="Sign in" />
          </Box>
          <Grid  container sx={{mb:2}} justifyContent="flex-end">
            <Grid item >
               <Link to='/signout' variant="body2" underline="hover"  color ={greyColor}>
                  {"Don't have an account? Sign Up"}
               </Link>
              </Grid >
            </Grid>
        </Box>
      </Container>
     
  );
};

export default SignIn;