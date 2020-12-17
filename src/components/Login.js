import gql  from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import React,{useState, useContext} from 'react'
import { Form , Button} from 'semantic-ui-react'
import '../css/Register.css'
import {useForm} from '../utils,hooks/hooks'
import { AuthContext } from '../context/Context'
import '../css/Login.css';
function Login(props) {
 const context = useContext(AuthContext);

 const [errors, seterrors] = useState({});
  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: ''
  });

  const [loginuser, { loading }] = useMutation(LOGIN_USER, {
    update( _,{data: {login: userData}}) {
    
       // context.login(result.data.login)
      context.login(userData);
      props.history.push('/');
    },
    onError(err){
            
        seterrors(err.graphQLErrors[0].extensions.exception.errors); 
    },
    variables: values
  });

  function loginUserCallback() {
    loginuser()
  }

  return (
    <div className="form__container">
      <Form onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>
        <Form.Input
          label="Username"
          placeholder="Email.."
          name="email"
          type="email"
          value={values.email}
          onChange={onChange}
        />
        <Form.Input
          label="Password"
          placeholder="Password.."
          name="password"
          type="password"
          value={values.password}
          onChange={onChange}
        />
        <Button type="submit" primary>
          Login
        </Button>
      </Form>
      {Object.keys(errors).length>0 && (
                <div className="ui__errormsg">
                <ul className="error__list">
                    {Object.values(errors).map(value=>(
                        <li key={value}>{value}</li>
                    ))}
                </ul>

            </div>
          )}
    </div>
  );
}

const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
export default Login
