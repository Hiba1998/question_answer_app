import AddIcon from '@mui/icons-material/Add';
import {Button,Grid,TextField} from '@mui/material';
const AnswerForm = (props) =>{

return(
    <Grid container justifyContent="center" spacing={1} mt={2}>
        <Grid item>
            <TextField  error={props.error} size="small"  margin="normal"  inputRef={props.inputAnswerRef} />
        </Grid>
        <Grid  item alignItems="stretch">
            <Button variant="contained" style={{
                    borderRadius: 25,
                    backgroundColor: "#21b6ae",
                    padding: "15px 15px",
                    fontSize: "10px",
                    textTransform:'none'}} size="small" startIcon={<AddIcon />} onClick={props.submitAnswer}>Add Answer</Button>
        </Grid>
    </Grid>
    );
};

export default AnswerForm;
