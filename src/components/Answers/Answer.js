
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import {Avatar,ListItem,ListItemText,List,ListItemAvatar} from '@mui/material';
function Answer(props){
    return(
        <List sx={{ width: '100%', bgcolor: 'background.paper' }}>
            {props.answers.map(answer =>(
                <ListItem key={answer.id}>
                    <ListItemAvatar><Avatar sx={{  bgcolor: '#2196f3'  }}><QuestionAnswerIcon/></Avatar></ListItemAvatar>
                    <ListItemText  sx={{fontSize:12}} primary= {answer.content}  />
                </ListItem>
            ))}
        </List>
    )
  };

  export default Answer;