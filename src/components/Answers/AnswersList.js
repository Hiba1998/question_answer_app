import React, { useState,useEffect,useRef,useContext} from 'react';
import {Grid,Typography,Container, CircularProgress} from '@mui/material';
import { useParams,useLocation } from 'react-router-dom';
import AuthContext from '../../store/auth-context';
import Answer from './Answer';
import AnswerForm from './AnswerForm';
import CardBox from '../UI/CardBox';
import ErrorAlert from '../UI/ErrorAlert';
const AnswersList = () => {
  const [answers,setAnswers] = useState([]);
  const [isLoading,setIsLoading] = useState(true);
  const [httpError,setHttpError] = useState(null);
  const [open,setOpen] = useState(false);
  const [validationError, setValidationError] = useState(false);
  const location = useLocation();
  const params = useParams();
  const {questionContent} = location.state;
  const inputAnswerRef = useRef();
  const authCtx = useContext(AuthContext);
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };
  useEffect(()=>{
    const fetchAnswers = async () => {
        const response = await fetch('https://cme-firstproject-default-rtdb.firebaseio.com/answers.json?orderBy="questionId"&equalTo="'+params.questionId+'"&print=pretty');
        if(!response.ok){
            throw new Error('Something went wrong!');
        }
        const responseData = await response.json();

        const loadedAnswers = [];

        for (const key in responseData){
            loadedAnswers.push(
                {
                    id: key,
                    content: responseData[key].content,
                    questionId: responseData[key].questionId,
                });
            }
        setAnswers(loadedAnswers);
        setIsLoading(false);
    };
    fetchAnswers().catch((error) =>{
        setIsLoading(false);
        setHttpError(error.message);
        setOpen(true);
        });     
},[params.questionId,answers]);

const submitAnswer =(event) =>{
  event.preventDefault();
  const enteredAnswer  = inputAnswerRef.current.value;
  if(enteredAnswer.trim().length === 0){
    setValidationError(true);
    return;
  }
  setValidationError(false);
  fetch('https://cme-firstproject-default-rtdb.firebaseio.com/answers.json',{
    method:'POST',
    body:JSON.stringify({
      content:enteredAnswer,
      questionId: params.questionId, 
      userID: authCtx.userId,
    }),
    headers:{
      'Content-Type' :'application/json'
    }
  });
}
  return (
    <Container>
      {httpError && <ErrorAlert errorText={httpError} open={open} autoHideDuration={3000} handleClose={handleClose} />}
      <AnswerForm error={validationError} inputAnswerRef={inputAnswerRef} submitAnswer={submitAnswer}/>

      <Grid container  justifyContent="center"  spacing={1} p={1}> 
      
        <Grid item  xs={10} sm={8} md={8}>
          <CardBox content={questionContent}/>
        </Grid>

        <Grid  container item xs={12} sm={8} md={8} m={1} justifyContent="flex-start">
          <Typography  sx={{ fontSize: 20 }} color="text.secondary">List of Answers</Typography>
        </Grid>

        {!isLoading && answers.length===0 && <p>no answers</p>}
        {isLoading && <CircularProgress /> }
        {!isLoading && answers.length > 0 && <Grid  item xs={12} sm={8} md={8}><Answer answers={answers}/></Grid>}

      </Grid> 
    </Container>
  );
};

export default AnswersList;