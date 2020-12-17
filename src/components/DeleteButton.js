import React, { useState } from 'react'
import gql from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import '../css/PostCard.css'
import {Modal,Header,Icon} from 'semantic-ui-react'
import {IconButton} from '@material-ui/core'
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import DeleteIcon from '@material-ui/icons/Delete';
import CloseIcon from '@material-ui/icons/Close';
import { FETCH_POSTS_QUERY } from '../utils,hooks/graphql'
function DeleteButton({postId, commentId, callback}) {
    const [open, setOpen] = useState(false);
    const MUTATION= commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
    const [deletePostOrComment] = useMutation(MUTATION,{
       
        variables:{
            postId,
            commentId
        },
        update(proxy, result){
          setOpen(false);
         if(!commentId){
          const data= proxy.readQuery({
            query: FETCH_POSTS_QUERY
          })
          const newPosts= data.getPosts.filter((p)=>p.id !== postId);
          proxy.writeQuery({query:FETCH_POSTS_QUERY,data:{getPosts:[...newPosts]}});
          
         }
         if(callback)callback();
        }
    })
    return (
        <Modal
        basic
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        size='small'
        trigger={ <DeleteOutlineIcon/>}
      >
        <Header icon>
          <Icon name='archive' />
       {commentId ? (
        <h1>delete comment for sure?</h1>
       ):(<h1>delete post for sure?</h1>)} 
        </Header>
        
        <Modal.Actions>
          <IconButton color="secondary" onClick={() => setOpen(false)}>
            <CloseIcon color="inherit"/> No
          </IconButton>
          <IconButton color='primary' onClick={() => {deletePostOrComment(); setOpen(false)}}>
            <DeleteIcon/> Yes
          </IconButton>
        </Modal.Actions>
      </Modal>
       
        
    
    )
}

const DELETE_POST_MUTATION = gql`
  mutation deletePost($postId: ID!) {
    deletePost(postId: $postId)
  }
`;

const DELETE_COMMENT_MUTATION = gql`
  mutation deleteComment($postId: ID!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        createdAt
        body
      }
      commentCount
    }
  }
`;

export default DeleteButton
