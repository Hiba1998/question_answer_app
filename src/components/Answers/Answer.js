
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import {Avatar,ListItem,ListItemText,List,ListItemAvatar} from '@mui/material';
function Answer(props){
    return(
        <List>
            {props.answers.map(answer =>(
                <ListItem key={answer.id}>
                    <ListItemAvatar><Avatar><QuestionAnswerIcon/></Avatar></ListItemAvatar>
                    <ListItemText  sx={{fontSize:10}} primary= {answer.content}  />
                </ListItem>
            ))}
        </List>
    )
  };

  export default Answer;