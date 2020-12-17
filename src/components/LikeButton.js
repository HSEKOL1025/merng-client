import React,{useState,useContext,useEffect} from 'react'
import {useMutation} from '@apollo/react-hooks'
import gql from 'graphql-tag'
import { IconButton} from '@material-ui/core'
import {Modal} from 'semantic-ui-react'
import { AuthContext } from '../context/Context'
import FavoriteBorderSharpIcon from '@material-ui/icons/FavoriteBorderSharp';
import FavoriteIcon from '@material-ui/icons/Favorite';
function LikeButton({post:{id,likes,likeCount}}) {
  const {user} = useContext(AuthContext)
    const [liked, setliked] = useState(false);
    useEffect(()=>{
        if(user && likes.find(like=> like.username === user.username)){
            setliked(true);
        }else setliked(false)
    },[user,likes]);
   
    
    const [open, setOpen] = React.useState(false)
    const [likePost] = useMutation(LIKE_POST_MUTATION, {
        variables: { postId: id }
      });
    
      const likeButton = user ? (
        liked ? (
            <FavoriteIcon color="primary"/>
        ) : (
            <FavoriteBorderSharpIcon/>
        )
      ) : (
        <Modal
        size='mini'
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        trigger={ <FavoriteBorderSharpIcon/>}
      >
       <Modal.Content><h3>please login to like a post</h3></Modal.Content>
      </Modal>
       
      );
    return (
          
                <IconButton size='small' onClick={user && likePost}>
                {likeButton}<label>{likeCount}</label>
                </IconButton>   
    )
}

const LIKE_POST_MUTATION = gql`
  mutation likePost($postId: ID!) {
    likePost(postId: $postId) {
      id
      likes {
        id
        username
      }
      likeCount
    }
  }
`;

export default LikeButton
