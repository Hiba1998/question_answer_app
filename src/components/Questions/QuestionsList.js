import React ,{useState,useEffect} from 'react';
import {Box,CircularProgress, Container,Grid} from '@mui/material';
import QuestionDialog from './QuestionDialog' ;
import AddButton from '../UI/AddButton';
import {useHistory} from 'react-router-dom';
import MaterialTable from "material-table";
import TypeSelect from '../UI/TypeSelect';
import ErrorAlert from '../UI/ErrorAlert';
    const QuestionsList = () => {
    const [questions,setQuestions] = useState({questions:[],addNewQuestion:0});
    const [isLoading,setIsLoading] = useState(true);
    const [httpError,setHttpError] = useState(null);
    const [types,setTypes] = useState([]);
    const [url,setUrl] = useState('https://cme-firstproject-default-rtdb.firebaseio.com/questions.json');
    const [open, setOpen] = useState(false);
    const [openAlert,setOpenAlert] = useState(false);
    const history = useHistory();
    const handleCloseAlert = (event, reason) => {
        if (reason === 'clickaway') {
          return;
        }
    
        setOpen(false);
      };
    useEffect(()=>{
        const controller = new AbortController();
        const fetchQuestions= async () => {
            const response = await fetch(url, {
                signal: controller.signal
              });
          
            if(!response.ok){
                throw new Error('Something went wrong!');
            }
            const responseData = await response.json();
        
            const loadedQuestions = [];

            for (const key in responseData){
            loadedQuestions.push(
                {
                    id: key,
                    content: responseData[key].content,
                    type: responseData[key].type,
                });
            }
             setQuestions(s =>({...s,questions:loadedQuestions}));
             setIsLoading(false);
            
        }
         fetchTypesHandler();
         fetchQuestions().catch((error) =>{
             if(error.name === 'AbortError') {
                 console.log('fetch aborted');
             }else {
             setIsLoading(false);
             setHttpError(error.message);
             setOpenAlert(true);
             }
           }); 
           return () => controller.abort();
    },[url,questions.addNewQuestion]);
    

    async function fetchTypesHandler(){

        const response = await fetch('https://cme-firstproject-default-rtdb.firebaseio.com/types.json');
        const responseData = await response.json();
        const loadedTypes = [];

        for (const key in responseData){
            loadedTypes.push({
                id: key,
                type: responseData[key].type,
             });
        }
            setTypes(loadedTypes);
        }; 

    const handleOpen = () => {
            setOpen(true);
    };
        
    const handleClose = () => {
        setOpen(false);
    };

    const newQuestion = () =>{
        setQuestions(s => ({...s,addNewQuestion: s.addNewQuestion + 1}));
    };

  return (
    <div>
        {httpError && <ErrorAlert errorText={httpError} open={openAlert} autoHideDuration={3000} handleClose={handleCloseAlert} />}
        {isLoading && <CircularProgress /> }
        {!isLoading && 
        <Container>
            <Grid container  justifyContent="center"  spacing={1} sx={{mt:4}}>
                <Grid item>
                    <TypeSelect  types={types} onChange={(e)=>{
                        setUrl('https://cme-firstproject-default-rtdb.firebaseio.com/questions.json?orderBy="type"&equalTo="'+e.target.value+'"&print=pretty');
                            }}/>
                </Grid>
                <Grid item alignItems="stretch">
                    <AddButton text="Add Question" handleOpen={handleOpen}/>
                </Grid>
            </Grid>
            
            <Box mt={5}> 
                 <MaterialTable 
                title="Questions"
                columns={[
                    { title: 'ID', field: 'id' },
                    { title: 'Content', field: 'content' },
                    {title:'Type',field:'type'},
                  ]}
                  data={questions.questions}  
                  options={
                      {
                          search: true,
                          debounceInterval:0
                      }
                  }
                  actions={[
                    {
                      icon: 'save',
                      tooltip: 'Show Answers',
                      onClick: (event, rowData) => history.push( {pathname: `/questions/${rowData.id}`,   
                      state: { questionContent: `${rowData.content}`}})
                    }
                ]}
                  />  
            </Box> 
            <QuestionDialog items={types} open={open} handleClose={handleClose} newQuestion={newQuestion}/>
        </Container>
        }
    </div>
  );
}
export default QuestionsList;