
import{useState } from 'react'

export const useForm=(callback, initialState={})=>{
     
  
    const [values, setvalues] = useState(initialState)
    const onChange=(event)=>{
        setvalues({...values,[event.target.name]:event.target.value})
    
    }

    const onSubmit=  event =>{
        callback();
    }

    return{
        onChange,
        onSubmit,
    
        values
    }
}





