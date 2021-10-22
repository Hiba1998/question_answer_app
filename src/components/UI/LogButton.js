
import {Button} from '@mui/material';
const LogButton = (props) =>{

return(
    <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2 }}
      >
        {props.sign}
      </Button>

    );
};

export default LogButton;
