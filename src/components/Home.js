import React,{useEffect,useState} from 'react'
import {useQuery} from '@apollo/react-hooks'
import {Grid,Card} from '@material-ui/core'
import {makeStyles} from '@material-ui/core/styles'
import PostCard from '../components/PostCard'
import '../css/Home.css'
import { FETCH_POSTS_QUERY } from '../utils,hooks/graphql'
import PostForm from './PostForm'

const useStyles = makeStyles((theme)=> ({
  grid:{
    width: '100%',
    margin: '0px'
  },
  card: {
    padding: theme.spacing(2),
    color : theme.palette.text.secondary,
    

  }
}))


 const Home =()=> {
   const classes = useStyles();
    const {loading, data}= useQuery(FETCH_POSTS_QUERY);
    const [Posts, setPosts] = useState([]);

    useEffect(() => {
        if(loading === false && data){
            setPosts(data.getPosts);
            
        }
    }, [loading, data])
   
    return (
        <Grid  spacing={1}>
      
        <h1>Recent Posts</h1>
            <PostForm />
        {loading ? (
          <h1>Loading posts..</h1>
        ) : (
          <Grid container spacing={2} className={classes.grid}>
            <Grid item xs >
            {Posts &&
              Posts.map((post) => (
                <Card className={classes.card} key={post.id} >
                  <PostCard post={post} />
                </Card>               
              ))}
              </Grid>
              </Grid>
        
        )}
    
    </Grid>
    )
}

export default Home
 