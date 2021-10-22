
import {Snackbar,Alert} from '@mui/material';
const ErrorAlert = (props) =>{

    return(
        <Snackbar open={props.open} autoHideDuration={3000} onClose={props.handleClose}>
          <Alert onClose={props.handleClose}  severity="error" sx={{ width: '100%' }}>
           {props.errorText}
          </Alert>
        </Snackbar>
    );
};

export default ErrorAlert;