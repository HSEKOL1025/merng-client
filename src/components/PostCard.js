import React,{useContext} from 'react'
import Card from '@material-ui/core/Card';
import {Link} from 'react-router-dom'
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import { AuthContext } from '../context/Context';
import DeleteButton from './DeleteButton';
import LikeButtonCopy from './LikeButton';
import CommentIcon from '@material-ui/icons/Comment';
import moment from 'moment'

function PostCardCopy({post:{body, createdAt, id, username, likeCount, commentCount, likes }}) {
    const {user} = useContext(AuthContext)
    return (
        <Card >
          
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            L
          </Avatar>
        
        }
     title={<Link to={`/posts/${id}`}><h2>{username}</h2></Link>}  
     subheader={moment(createdAt).fromNow()}     
        action={
          <IconButton aria-label="settings">
             {user && user.username === username && <DeleteButton postId={id}/>}
          </IconButton>
        }
        // title="Shrimp and Chorizo Paella"
        // subheader="September 14, 2016"
      />
      {/* <CardMedia
        className={classes.media}
        image="/static/images/cards/paella.jpg"
        title="Paella dish"
      /> */}
      <CardContent>
        {/* <Typography variant="body2" color="textSecondary" component="p"> */}
    {body}
        {/* </Typography> */}
      </CardContent>
      <CardActions disableSpacing>
        <IconButton aria-label="add to favorites">
          {/* <FavoriteIcon /> */}
          <LikeButtonCopy post={{id,user,likes,likeCount}}/>
         
        </IconButton>
        <Link to={`/posts/${id}`}>
        <IconButton   >
        <CommentIcon color="primary"/>
        
      {/* <Button color='teal' basic>
        <Icon name='comments' />
      </Button> */}
      <label >
        {commentCount}
      </label>
    </IconButton>
    </Link> 
          {/* <ExpandMoreIcon /> */}
      </CardActions>
    </Card>
    )
}

export default PostCardCopy
