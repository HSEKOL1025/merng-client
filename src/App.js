


import 'semantic-ui-css/semantic.min.css';
import './App.css';
import Home from './components/Home'
import Login from './components/Login'
import Register from './components/Register'
import MenuBar from './components/MenuBar'
import { Container } from '@material-ui/core'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import { AuthProvider } from './context/Context';
import AuthRoute from './utils,hooks/AuthRoutes';
import SinglePost from './components/SinglePost'
function App() {
  return (
    <AuthProvider>
 <>
    <Router>
      <Container>
      <MenuBar/>
      <Route exact path='/' component={Home}/>
      <AuthRoute exact path='/login' component={Login}/>
      <AuthRoute exact path='/register' component={Register}/>
      <Route exact path='/posts/:postId' component={SinglePost}/>
      </Container>
      </Router>
     
    </>
    </AuthProvider>
   
  );
}

export default App;
