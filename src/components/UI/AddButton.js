import { Fragment } from "react";
import AddIcon from '@mui/icons-material/Add';
import {Button} from '@mui/material';
const AddButton = (props) =>{

    return(
     <Fragment>
        <Button style={{
            backgroundColor: "#21b6ae",
           }} startIcon={<AddIcon />} onClick={props.handleOpen}>{props.text}</Button>
     </Fragment>
    );
};

export default AddButton;

