import { Container, Divider,Typography,Box,Grid,TextField,InputLabel,Button} from "@mui/material";
import { useContext, useEffect, useRef, useState } from "react";
import AuthContext from '../store/auth-context';
import ErrorAlert from './UI/ErrorAlert';
function MyProfile(){
  const [userdetails,setUserDetails] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [httpError,setHttpError] = useState(null);
  const [openAlert,setOpenAlert] = useState(false);
  const authCtx = useContext(AuthContext);
  const inputFname = useRef();
  const inputLname = useRef();
  const inputTitle = useRef();
  const inputLinkedIn = useRef();

  const handleCloseAlert = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenAlert(false);
  };
useEffect(()=>{
  const fetchUserDetails= async () => {
      const response = await fetch('https://cme-firstproject-default-rtdb.firebaseio.com/user.json?orderBy="userID"&equalTo="'+authCtx.userId+'"&print=pretty');
    
      if(!response.ok){
          throw new Error('Something went wrong!');
      }
      const responseData = await response.json();
  
      const loadedUserDetails = [];
  
      for (const key in responseData){
        loadedUserDetails.push(
              {
                  id: key,
                  fname: responseData[key].fname,
                  lname: responseData[key].lname,
                  title:responseData[key].title,
                  linkedinUrl:responseData[key].linkedinUrl,
                  userID: responseData[key].userID,
              });
          }
       setUserDetails(loadedUserDetails);
       setIsLoading(false);
  }
  
   fetchUserDetails().catch((error) =>{
       setIsLoading(false);
       setHttpError(error.message);
     });     
  },[authCtx.userId]);

  const submitHandle =  (event) => {
    event.preventDefault();
      const enteredFirstName = inputFname.current.value;
      const enteredLastName = inputLname.current.value;
      const enteredTitle = inputTitle.current.value;
      const enteredLinkedIn = inputLinkedIn.current.value;
      console.log(userdetails);
     fetch('https://cme-firstproject-default-rtdb.firebaseio.com/user/'+ userdetails[0].id  +'.json',
     {
      method:'PATCH',
      body: JSON.stringify({
        fname:enteredFirstName,
        lname:enteredLastName,
        title:enteredTitle,
        linkedinUrl:enteredLinkedIn,
      }),
      headers :{
        'Content-Type': 'application/json'
      }
    }
    ).then(response => {
      if(response.ok){
        return response.json();
      }
      else{
       return  response.json().then(data => {
         let errorMessage = 'Update failed';
         if(data && data.error.message){
          errorMessage = data.error.message;
        }
        throw new Error(errorMessage);
        });
      }
    }
   ).catch(err =>{
     setHttpError(err.message);
     setOpenAlert(true);
   });
  };

    return (
      <Container>
          <Typography component="h1" variant="h5"> Basic Info</Typography><br/>
          <Divider light/>
          {httpError &&  <ErrorAlert errorText={httpError} open={openAlert} autoHideDuration={3000} handleClose={handleCloseAlert} />}
          {!isLoading && 
        <Box component="form"  onSubmit={submitHandle} sx={{ mt: 3 }}>
          <Grid container spacing={2}>

            <Grid item xs={12} sm={6} p={2}>
              <InputLabel> First Name:</InputLabel>
              <TextField  fullWidth variant="standard" inputRef={inputFname} defaultValue={userdetails[0].fname}/>
            </Grid>

            <Grid item xs={12} sm={6} p={2}>
              <InputLabel>Last Name :</InputLabel>
              <TextField  fullWidth variant="standard" inputRef = {inputLname} defaultValue={userdetails[0].lname}/>
            </Grid>
              
            <Grid item xs={12} sm={6} md={6} p={2}>
              <InputLabel>Title :</InputLabel>
              <TextField  fullWidth  variant="standard" inputRef={inputTitle} defaultValue={userdetails[0].title}/>
            </Grid>

            <Grid item xs={12} sm={6} md={6} p={2}>
              <InputLabel>LinkedIn URL :</InputLabel>
              <TextField  fullWidth variant="standard" inputRef={inputLinkedIn} defaultValue={userdetails[0].linkedinUrl}/>
            </Grid>
          </Grid>
          <Button type="submit"  variant="contained" >Save</Button>
        </Box>}
      </Container>
    )
  }
  
  export default MyProfile;