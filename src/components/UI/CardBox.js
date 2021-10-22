import {Card,CardContent,Typography} from '@mui/material';
function CardBox(props){
    return(
        <Card  sx={{ bgcolor: '#283593' }}>
            <CardContent>
                <Typography sx={{ fontSize: 14 }} color="#f5f5f5">
                    {props.content}
                </Typography>
            </CardContent>
      </Card>
    )
  };

  export default CardBox;