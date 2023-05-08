import {React,useEffect,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'

function Login() {
 
  const navigate = useNavigate();

  const initialValues = {

    email:"",
    password:"",
  };
  const [input, setInput] = useState(initialValues);
  const [formError, setFormError] = useState({});
  const [issubmit, setIssubmit] = useState(false);
  const loggeduser =JSON.parse(localStorage.getItem("user"));

  const loginValidation = (values) => {
    const errors = {};


    if (!values.email) {
        errors.email = "Enter a valid email address";
    }
    if (!values.password) {
        errors.password = "Enter a password";
    }

    return errors;
}


//   const generate_token=(length)=>{
//     //edit the token allowed characters
//     var a = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".split("");
//     var b = [];  
//     for (var i=0; i<length; i++) {
//         var j = (Math.random() * (a.length-1)).toFixed(0);
//         b[i] = a[j];
//     }
//     input['token'] = b.join("")
   
  
//     //return b.join("");
   
// }

  const handleLogin = (e) =>{
  
      e.preventDefault();
      setFormError(loginValidation(input));
      setIssubmit(true)

   
    const loggeduser =JSON.parse(localStorage.getItem("user"));
    console.log("loggeddd user",loggeduser);
  
  }
 
  useEffect(() => {
    if (Object.keys(formError).length === 0 && issubmit) {
        let flag = false
        for (const key in loggeduser) {
            if ((loggeduser[key].email === input.email) && (loggeduser[key].password === input.password)) {

                flag = true
                break;

            }else{
                alert("Please enter valid email and password")
            }
        }
        if (flag === true) {

          let result = '';
          const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
          const charLength = str.length;
          let counter = 0;
          while (counter < 33) {
              result += str.charAt(Math.floor(Math.random() * charLength));
              counter += 1;
          }
          input['token'] = result;
          localStorage.setItem('token', JSON.stringify(input))
          navigate('/ViewData')
          //  generate_token(32);
           // localStorage.setItem('LoggedIn user', JSON.stringify(input))
         
        }
    }
    //eslint-disable-next-line
}, [formError])

  return (
   
      <div className="container-reg">
       <form onSubmit={handleLogin}>
        <div className="section">
          <div className="row">
            <div className="container">
              <div className="heading">
                <h3>Login</h3>
              </div>
          
            <label htmlFor="Email">Email</label>
              <input
                type="text"
                className="input"
                name="email"
                value={input.email}
                onChange={(e)=>
                    setInput({
                        ...input,
                        [e.target.name]:e.target.value,
                    })
                }
              />
               <p className='span1'>{formError.email}</p>

                     

             <label htmlFor="password">password</label>
              <input
                type="password"
                className="input"
                name="password"
                value={input.password}
                onChange={(e)=>{
                    setInput({
                        ...input,
                        [e.target.name]:e.target.value, 
                    })
                }}
              />
                <p className='span1'>{formError.password}</p>
              <div className="bottom">
                <input className="input" type="submit" value="submit" />
                <Link to="/public/registration">Register Here</Link>
              </div>
              <div>
              
              </div>
            </div>
          </div>
        </div>
      </form>
      
    </div>
    
  )
}

export default Login
