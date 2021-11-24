import {Grid,TextField} from '@mui/material';
import AddButton from '../UI/AddButton';
const AnswerForm = (props) =>{

return(
    <Grid container justifyContent="center" spacing={1} mt={2}>
        <Grid item>
            <TextField  error={props.error} size="small"  inputRef={props.inputAnswerRef} />
        </Grid>
        <Grid  item alignItems="stretch">
            <AddButton  text="Add Answer" handleOpen={props.submitAnswer}/>
        </Grid>
    </Grid>
    );
};

export default AnswerForm;
