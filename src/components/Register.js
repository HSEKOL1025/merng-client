import gql  from 'graphql-tag'
import {useMutation} from '@apollo/react-hooks'
import React,{useState,useContext} from 'react'
import { Form , Button} from 'semantic-ui-react'
import '../css/Register.css'
import {useForm} from '../utils,hooks/hooks'
import { AuthContext } from '../context/Context'
function Register(props) {
    const [errors, seterrors] = useState({});
    const context = useContext(AuthContext);
    const {onChange, onSubmit, values }= useForm(registerUser, {
        username:'',
        email:'',
        password:'',
        confirmPassword:''
    })
   
   
    const [adduser,{loading}]= useMutation(REGISTER_USER,{
        update(proxy, {data:{register : userData}} ){
            context.login(userData);
            props.history.push('/');
        },
        onError(err){
            
            seterrors(err.graphQLErrors[0].extensions.exception.errors); 
        },
        variables: values
    });
    function registerUser(){
      adduser()  
    }


  
    return (
        <div className="form__container">
           <Form onSubmit={onSubmit} noValidate className={loading ?'loading':''}>
               <h1>Register</h1>
               <Form.Input
                    label="Username"
                    placeholder="Username.."
                    name="username"
                    type="text"
                    value={values.username}
                    error={errors.username? true: false}
                    onChange={onChange}
                    />
                      <Form.Input
                    label="Email"
                    placeholder="Email.."
                    name="email"
                    type="email"
                    value={values.email}
                    error={errors.email? true: false}
                    onChange={onChange}
                    />
                      <Form.Input
                    label="Password"
                    placeholder="Password.."
                    name="password"
                    type="password"
                    value={values.password}
                    error={errors.password? true: false}
                    onChange={onChange}
                    />
                      <Form.Input
                    label="ConfirmPassword"
                    placeholder="ConfirmPassword.."
                    name="confirmPassword"
                    type="password"
                    value={values.confirmPassword}
                    error={errors.confirmPassword? true: false}
                    onChange={onChange}
                    />
                    <Button type="submit" primary>
                        register
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
    )
}

const REGISTER_USER = gql`
mutation register(
    $username: String!
    $email: String!
    $password: String!
    $confirmPassword: String!

){
    register(
        registerInput:{
        username: $username
        email:$email
        password:$password
        confirmPassword:$confirmPassword
        }
    ){
        id email username createdAt token
    }
}

`
export default Register
