import React,{useState,useContext,useEffect} from 'react';
import {Grid,Typography,CircularProgress} from '@mui/material'
import AuthContext from '../../store/auth-context';
import CardBox from '../UI/CardBox';
import ErrorAlert from '../UI/ErrorAlert';
function MyAnswers(){
  const authCtx = useContext(AuthContext);
  const [myanswers,setMyAnswers] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [httpError,setHttpError] = useState(null);
  const [open,setOpen] = useState(false);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  useEffect(()=>{
    const fetchMyAnswers = async () => {
        const response = await fetch('https://cme-firstproject-default-rtdb.firebaseio.com/answers.json?orderBy="userID"&equalTo="'+authCtx.userId+'"&print=pretty');
        
        if(!response.ok){
            throw new Error('Something went wrong!');
        }
        const responseData = await response.json();
    
        const loadedMyAnswers = [];
    
        for (const key in responseData){
            loadedMyAnswers.push(
                {
                    id: key,
                    content: responseData[key].content,
                    userID: responseData[key].userID,
                });
            }
        setMyAnswers(loadedMyAnswers);
        setIsLoading(false);
    };
    
    fetchMyAnswers().catch((error) =>{
        setIsLoading(false);
        setHttpError(error.message);
        setOpen(true);

        });     
    },[authCtx.userId]);
    return(
    <Grid  container item xs={12} sm={8} md={8} m={2} justifyContent="flex-start">
        <Typography  sx={{ fontSize: 20 }} color="text.secondary">
        List of Answers
      </Typography>
        {httpError && <ErrorAlert errorText={httpError} open={open} autoHideDuration={3000} handleClose={handleClose} />}
        {isLoading && <CircularProgress />}
        {!isLoading && myanswers.length === 0 && <p>no answers</p> }
        {!isLoading && myanswers.length > 0 &&
            <>
            {myanswers.map(myanswer =>(
                        <Grid item key={myanswer.id}  xs={12} sm={12} md={12}  m={1}>
                        <CardBox content={myanswer.content}/>
                        </Grid>
                    ))}
            </>
        }
    </Grid>

    )
  };

  export default MyAnswers;