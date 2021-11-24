import React ,{useRef,useContext,useState} from 'react';
import {Button,Dialog,DialogActions,DialogContent,DialogTitle} from '@mui/material';
import {Grid,InputLabel,TextField} from '@mui/material';
import AuthContext from '../../store/auth-context';
import TypeSelect from '../UI/TypeSelect';

export default function QuestionDialog(props) {

  const questionInputRef = useRef();
  const typeInputRef = useRef();
  const authCtx = useContext(AuthContext);
  const [validationError,setValidationError] = useState(false); 

  const addQuestionHandle = async (event) =>{
    
    event.preventDefault();
    const enteredQuestion  = questionInputRef.current.value;
    const enteredType = typeInputRef.current.value;

    if(enteredQuestion.trim().length === 0 || enteredType.trim().length === 0){
      setValidationError(true);
      return;
    }
    setValidationError(false);
    await fetch('https://cme-firstproject-default-rtdb.firebaseio.com/questions.json',{
      method:'POST',
      body:JSON.stringify({
        content:enteredQuestion,
        type: enteredType, 
        userID: authCtx.userId,
      }),
      headers:{
        'Content-Type' :'application/json'
      }
    });
    props.handleClose();
    props.newQuestion();
  }
  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}  fullWidth maxWidth="sm" >
        <DialogTitle>Post a new question</DialogTitle>
        <DialogContent>
          <Grid container spacing={2}  >
              <Grid item xs={12} sm={12}>
                  <InputLabel>Question :</InputLabel>
                  <TextField fullWidth size="small" error={validationError} inputRef={questionInputRef}/>
              </Grid >
              <Grid item xs={4} sm={3}>
                <TypeSelect text="Type" types={props.items} typeInputRef={typeInputRef} error={validationError}/>
              </Grid>
          </Grid> 
        </DialogContent>
        <DialogActions>
                <Button onClick={props.handleClose}>Cancel</Button>
                <Button type="submit" onClick={addQuestionHandle}>Add</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
