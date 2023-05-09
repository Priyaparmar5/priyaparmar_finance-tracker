import {React,useEffect,useState} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import  {yupResolver} from "@hookform/resolvers/yup"
import * as yup from 'yup'
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

const schema =  yup.object().shape({
  email : yup.string().email().required("Email is required")
  .test("email", "Please enter valid email", function (value) {
    const storedData = JSON.parse(localStorage.getItem("user")) || [];
    return (
      storedData.filter((data) => data.email === value).length !== 0 || !value
    );
  }),
  password : yup.string().min(4).max(20).required("password is required"), 
})

const {
  register,
  handleSubmit,
  formState:{errors}
}=useForm({resolver: yupResolver(schema)});

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
const handleChange = (e) => { 
  setInput((previousValues) => ({
    ...previousValues,
    [e.target.name]: e.target.value
  }));
};

  const handleLogin = (e) =>{
  
      e.preventDefault();
    //  setFormError(loginValidation(input));
      setIssubmit(true)
   
    const loggeduser =JSON.parse(localStorage.getItem("user"));
    console.log("loggeddd user",loggeduser);
  
  }
 
  useEffect(() => {
    // if (Object.keys(formError).length === 0 && issubmit) {
    //     let flag = false
    //     for (const key in loggeduser) {
    //         if ((loggeduser[key].email === input.email) && (loggeduser[key].password === input.password)) {

    //             flag = true
    //             break;

    //         }else{
    //             alert("Please enter valid email and password")
    //         }
    //     }
    //     if (flag === true) {

    //       let result = '';
    //       const str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //       const charLength = str.length;
    //       let counter = 0;
    //       while (counter < 33) {
    //           result += str.charAt(Math.floor(Math.random() * charLength));
    //           counter += 1;
    //       }
    //       input['token'] = result;
    //       localStorage.setItem('token', JSON.stringify(input))
    //       navigate('/ViewData')
    //       //  generate_token(32);
    //        // localStorage.setItem('LoggedIn user', JSON.stringify(input))
         
    //     }
    // }
    //eslint-disable-next-line
}, [formError])

const loggedusers =JSON.parse(localStorage.getItem("user"));

const onSubmit = (data) =>{ 
  console.log("logindataa",data);
  const storedData ={
   
    email: data.email,
    password: data.password,
  }

   if (Object.keys(formError).length === 0 ) {
        let flag = false
        for (const key in loggedusers) {
          console.log("in for loop",loggedusers);
            if ((loggedusers[key].email === data.email) && (loggedusers[key].password === data.password)) {

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
}

  return (
   
      <div className="container-reg">
       <form onSubmit={handleSubmit(onSubmit)}> 
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
                {...register("email")}
                //    value={input.email}
                onChange={handleChange}
              />
               <p className='span1'>{errors.email?.message}</p>

                     

             <label htmlFor="password">password</label>
              <input
                type="password"
                className="input"
                name="password"
                {...register("password")}
                //    value={input.email}
                onChange={handleChange}
              />
                <p className='span1'>{errors.password?.message}</p>
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
