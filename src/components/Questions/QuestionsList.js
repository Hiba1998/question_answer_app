import React ,{useState,useEffect} from 'react';
import {Box,CircularProgress, Container,Grid} from '@mui/material';
import QuestionDialog from './QuestionDialog' ;
import AddButton from '../UI/AddButton';
import {useHistory} from 'react-router-dom';
import MaterialTable from "material-table";
import TypeSelect from '../UI/TypeSelect';
import ErrorAlert from '../UI/ErrorAlert';
export default function QuestionsList() {
    const [questions,setQuestions] = useState([]);
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
        const fetchQuestions= async () => {
            const response = await fetch(url);
          
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
             setQuestions(loadedQuestions);
             setIsLoading(false);
        }
         fetchTypesHandler();
         fetchQuestions().catch((error) =>{
             setIsLoading(false);
             setHttpError(error.message);
             setOpenAlert(true);
           });     
    },[url,questions]);
    

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

  return (
    <>
        {httpError && <ErrorAlert errorText={httpError} open={openAlert} autoHideDuration={3000} handleClose={handleCloseAlert} />}
        {isLoading && <CircularProgress /> }
        {!isLoading && 
        <Container>
            <Grid container  justifyContent="center" sx={{mt:4}}>
                <TypeSelect text="Filter by Type" types={types} onChange={(e)=>{
                        setUrl('https://cme-firstproject-default-rtdb.firebaseio.com/questions.json?orderBy="type"&equalTo="'+e.target.value+'"&print=pretty');
                    }}/>
                <AddButton text="Add Question" handleOpen={handleOpen}/>
            </Grid>
            
            <Box mt={5}> 
                 <MaterialTable 
                title="Questions"
                columns={[
                    { title: 'ID', field: 'id' },
                    { title: 'Content', field: 'content' },
                    {title:'Type',field:'type'},
                  ]}
                  data={questions}  
                  
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
            <QuestionDialog items={types} open={open} handleClose={handleClose} />
        </Container>
        }
    </>
  );
}
