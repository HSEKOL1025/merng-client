
import React, { useContext, useState } from 'react'
import moment from 'moment'
import gql from 'graphql-tag'
import {useMutation, useQuery} from '@apollo/react-hooks'
import { Button,IconButton,Card, Grid } from '@material-ui/core';
import { AuthContext } from '../context/Context';
import LikeButtonCopy from './LikeButton';
import DeleteButton from './DeleteButton';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Avatar from '@material-ui/core/Avatar';
import CommentIcon from '@material-ui/icons/Comment';
import {Comment,Header} from 'semantic-ui-react'
import PostAddIcon from '@material-ui/icons/PostAdd';

const useStyles = makeStyles((theme) => ({
 inputField:{
 '& > *':  {
    margin: theme.spacing(1),
    width: '100%',
 }

},
button:{
  margin: theme.spacing(1),
  width: '100px'
 },
 deleteButton:{
    float:"right",
    paddingTop:"4px"
    
 }
}));
function SinglePost(props) {
    const classes= useStyles();
    const {user} = useContext(AuthContext);
    const postId= props.match.params.postId;
console.log(postId)
const [comment, setComment] = useState('')
  const {data }= useQuery(FETCH_POST_QUERY,{
      variables:{
          postId
      }
  })
  const [postComment] = useMutation(POST_COMMENT_MUTATION,{
      update(){
        setComment('')
      },
      variables:{
          postId,
          body: comment
      }
  })
  const deleteButtonCallback=()=>{
      props.history.push('/')
  }
    let postMarkup
    if(!data){
        postMarkup= <p>loading..</p>
    }else{
      console.log(data.getPost)
        const {id, body, createdAt, username, comments ,likes, likeCount, commentCount}= data.getPost;
        postMarkup= (
         <Grid container >
             <Grid item xs>
             <Card >
      <CardHeader
        avatar={
          <Avatar aria-label="recipe">
            L
          </Avatar>
        
        }
     title={<h2>{username}</h2>}  
     subheader={moment(createdAt).fromNow()}     
        action={
          <IconButton aria-label="settings">
             {user && user.username === username && <DeleteButton postId={id} callback={deleteButtonCallback}/>}
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
        <IconButton >
          {/* <FavoriteIcon /> */}
          <LikeButtonCopy post={{id,user,likes,likeCount}}/>
         
        </IconButton>
    
        <IconButton   >
        <CommentIcon color="primary"/>
        
      {/* <Button color='teal' basic>
        <Icon name='comments' />
      </Button> */}
      <label >
        {commentCount}
      </label>
    </IconButton>
    
          {/* <ExpandMoreIcon /> */}
      </CardActions>
    </Card>
    <Comment.Group>
                  <Header as='h3' dividing>
      Comments
    </Header>
    {comments.map(comment =>(
  <Comment key={comment.id}>
    <Comment.Content>
      
    <Comment.Author>{comment.username}</Comment.Author>
    <Comment.Metadata>{moment(comment.createdAt).fromNow()}</Comment.Metadata>
    <Comment.Text>{comment.body}{user && user.username=== comment.username &&(
  <IconButton className={classes.deleteButton} ><DeleteButton postId={id} commentId={comment.id}/></IconButton>
        )}</Comment.Text>
  
    </Comment.Content>
  </Comment>

    ))}
     {user && <form noValidate autoComplete="off" className={classes.inputField}>
       
           <TextField id="standard-basic" label="comment.."
           value={comment}
           onChange={event=> setComment(event.target.value)}

           />  <Button
           variant="contained"
           color="primary"
           className={classes.button}
           endIcon={<PostAddIcon>send</PostAddIcon>}
           disabled={comment.trim()===''} onClick={postComment}
         >
           Send
         </Button> 
         


   </form> } 
      
     
   
  
    </Comment.Group>
             </Grid>
         </Grid>
         
        )
    }
    return postMarkup
        
            
        
    
}
const FETCH_POST_QUERY = gql`
query($postId : ID!){
    getPost(postId: $postId){
        id
        body
        username
        likeCount
        likes{
            username
        }
        commentCount
        comments{
            id
            username
            createdAt
            body
        }
    }
}

`
const POST_COMMENT_MUTATION = gql`
  mutation($postId: String!, $body: String!) {
    createComment(postId: $postId, body: $body) {
      id
      comments {
        id
        body
        createdAt
        username
      }
      commentCount
    }
  }
`;

export default SinglePost