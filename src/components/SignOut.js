import React,{useRef,useState} from 'react';
import { useHistory } from 'react-router-dom';
import {Avatar,TextField,Grid,Box,Typography,Container,CssBaseline} from '@mui/material';
import LogButton from './UI/LogButton';
import ErrorAlert from './UI/ErrorAlert';
const SignOut = () => {
    const history = useHistory();
    const inputFnameRef = useRef();
    const inputLnameRef = useRef();
    const inputEmailRef = useRef();
    const inputPasswordRef = useRef();
    const [error,setError] = useState(null);
    const [open, setOpen] = useState(false);
    const handleClose = (event, reason) => {
      if (reason === 'clickaway') {
        return;
      }
  
      setOpen(false);
    };
    const submitHandle = (event) => {
      event.preventDefault();
      const enteredFirstName = inputFnameRef.current.value;
      const enteredLastName = inputLnameRef.current.value;
      const enteredEmail = inputEmailRef.current.value;
      const enteredPassword = inputPasswordRef.current.value;
      if(enteredFirstName.trim().length === 0 || enteredLastName.trim().length === 0 || enteredEmail.trim().length === 0 || enteredPassword.trim().length === 0)
        return;
        
      fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyB0Pbf1tXqpx_b33caI4A3mrm7Y2LG9dEs',
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
          if(response.ok) {
            return response.json().then((data) =>{
              
              fetch('https://cme-firstproject-default-rtdb.firebaseio.com/user.json',
              {
                method:'POST',
                body: JSON.stringify({
                  fname: enteredFirstName,
                  lname:enteredLastName,
                  email:enteredEmail,
                  userID:data.localId,
                }),
                headers :{
                  'Content-Type': 'application/json'
                }
              });
             history.replace('/signin');
            });
          }
          else {
            return  response.json().then(data => {
              let errorMessage = 'Authentication failed';
                if(data && data.error.message){
                  errorMessage = data.error.message;
                }
            throw new Error (errorMessage);
          });
        }
      }
     )
     .catch(err =>{
      setError(err.message);
      setOpen(true);
    });
    }
  return (
  <Container component="main" maxWidth="xs">
    <CssBaseline />
    {error && <ErrorAlert errorText={error} open={open} autoHideDuration={3000} handleClose={handleClose} />}
    <Box
      sx={{
        marginTop: 8,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Avatar sx={{ m: 1 }}></Avatar>
      <Typography component="h1" variant="h5">Sign up</Typography>

      <Box component="form"  onSubmit={submitHandle}   sx={{ mt: 3 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField autoComplete="fname" fullWidth  label="First Name" autoFocus inputRef={inputFnameRef} required/>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField fullWidth label="Last Name"autoComplete="lname" inputRef={inputLnameRef} required/>
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Email Address" autoComplete="email" inputRef={inputEmailRef} required/>
          </Grid>

          <Grid item xs={12}>
            <TextField fullWidth label="Password" type="password" inputRef={inputPasswordRef} required/>
          </Grid>
        </Grid>
          <LogButton sign ="Sign out" />
      </Box>
    </Box>
  </Container>
   
  );
};

export default SignOut;