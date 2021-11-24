import React,{useState,useEffect,useContext} from 'react';
import {Typography,Grid,CircularProgress} from '@mui/material';
import CardBox from '../UI/CardBox';
import AuthContext from '../../store/auth-context';
import ErrorAlert from '../UI/ErrorAlert';
function MyQuestions(){
  const authCtx = useContext(AuthContext);
  const [myquestions,setMyquestions] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [httpError,setHttpError] = useState(null);
  const [open,setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
useEffect(()=> {
  const controller = new AbortController();
const fetchMyQuestions = async () => {
    const response = await fetch('https://cme-firstproject-default-rtdb.firebaseio.com/questions.json?orderBy="userID"&equalTo="'+authCtx.userId+'"&print=pretty',{
      signal: controller.signal
    });
    
    if(!response.ok){
        throw new Error('Something went wrong!');
    }
    const responseData = await response.json();

    const loadedMyQuestions = [];

    for (const key in responseData){
        loadedMyQuestions.push(
            {
                id: key,
                content: responseData[key].content,
                type: responseData[key].type,
                userID: responseData[key].userID,
            });
        }
    setMyquestions(loadedMyQuestions);
    setIsLoading(false);
};

fetchMyQuestions().catch((error) =>{
  if(error.name === 'AbortError') {
    console.log('fetch aborted');
  }else {
    setIsLoading(false);
    setHttpError(error.message);
    setOpen(true);
  }
  return () => controller.abort();  
    });     
},[myquestions,authCtx.userId]);

    return (
        <Grid container>

          <Grid container item  xs={12} sm={12} md={12} justifyContent="flex-start">
             <Typography  sx={{ fontSize: 20 }} color="text.secondary">List of Questions</Typography>
          </Grid>
        {httpError && <ErrorAlert errorText={httpError} open={open} autoHideDuration={3000} handleClose={handleClose} />}
        {isLoading && <CircularProgress />}
        {!isLoading && myquestions.length === 0 && <p>no questions</p> }
        {!isLoading && myquestions.length > 0 &&
        <>
          {myquestions.map(myquestion =>(
                <Grid item key={myquestion.id}  xs={12} sm={12} md={12}  m={1}>
                  <CardBox  content={myquestion.content}/>
                </Grid>
            ))}
        </>
          }
        </Grid>
        
    )
  }
  
  
  export default MyQuestions;