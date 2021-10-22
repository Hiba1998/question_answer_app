import { Fragment } from "react";
import AddIcon from '@mui/icons-material/Add';
import {Button} from '@mui/material';
const AddButton = (props) =>{

    return(
     <Fragment>
        <Button variant="contained" style={{
            borderRadius: 25,
            backgroundColor: "#21b6ae",
            padding: "15px 15px",
            fontSize: "10px",
            textTransform:'none'}} size="small" startIcon={<AddIcon />} onClick={props.handleOpen}>{props.text}</Button>
     </Fragment>
    );
};

export default AddButton;

