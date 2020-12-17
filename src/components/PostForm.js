
import { useMutation } from '@apollo/react-hooks';
import React,{useState} from 'react'
import gql from 'graphql-tag'
//import { AuthContext } from '../context/Context'
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import {Form, Modal} from 'semantic-ui-react'
import {TextField,Button} from '@material-ui/core'
import {useForm} from '../utils,hooks/hooks'
import { FETCH_POSTS_QUERY } from '../utils,hooks/graphql'
import '../css/PostForm.css'
const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  extendedIcon: {
    marginRight: theme.spacing(1),
  },
}));
function PostForm() {
  const classes= useStyles();
    const {onChange,values,onSubmit} = useForm(createPostCallback,{
        body:''
      });
    
    
      const [createPost,{error}] = useMutation(CREATE_POST_MUTATION, {
        variables: values,
        update (proxy, result) {
          const data = proxy.readQuery({
            query: FETCH_POSTS_QUERY
          })
          const new_post = result.data.createPost //here's the new var(immutable apollo cache)
          proxy.writeQuery({
            query: FETCH_POSTS_QUERY,
            data: { getPosts: [new_post, ...data.getPosts] } // here you're using that var to write the cache
          })
          values.body = ''
        }
      })
  
      function createPostCallback(){
        createPost();
      }

      function onSubmitHandler(error){
        if(error){
          
                alert(error.graphQLErrors[0].message)
            
        } else{
          onSubmit();
          setOpen(false);
        }
      }
      const [open, setOpen] =useState(false)
  
    return (
      <>
        <Modal 
        as={Form}
        size="tiny"
        dimmer={'blurring'}
        onClose={() => setOpen(false)}
        onOpen={() => setOpen(true)}
        open={open}
        onSubmit={()=>onSubmitHandler(error)}
        trigger={ <div className={classes.root}>
        <Fab color="primary" size="small" aria-label="add">
          <AddIcon>createPost</AddIcon>
        </Fab></div>}
      >
      
       
     
     {/* <Image size='medium' src='/images/avatar/large/rachel.png' wrapped /> */}
     <div>
     <TextField noValidate autoComplete="off"
          id="standard-full-width"
          style={{ margin: 7 ,width: '98%'}}
          placeholder="what's on your mind??"
          fullWidth
          margin="normal"
          name="body"
          onChange={onChange}
          value={values.body}
          error={error ? true:false}
          InputLabelProps={{
            shrink: true,
          }}
          variant="standard"
        />
     </div>
       <Modal.Actions>
       <Button  type="submit" color="secondary">post</Button>
         </Modal.Actions>
        
        
        </Modal>
        
        </>
    )
}
const CREATE_POST_MUTATION = gql`
mutation createPost($body:String!){
  createPost(body: $body){
    id body createdAt username
    likes{
      id username createdAt
    }
    likeCount
    comments{
      id body username createdAt
    }
    commentCount
  }

  
}

`

export default PostForm
