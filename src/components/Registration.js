import { useState } from "react";
import {Link, useNavigate } from 'react-router-dom'
import "../App.css";
function Registration() {

    const navigate = useNavigate();
    const initialValues = {
        uname:"",
        email:"",
        password:"",
      };
    const [input, setInput] = useState(initialValues);
    const [formError, setFormError] = useState({});

    
    const registerValidation = (values) => {
      const errors = {};

      if (!values.uname) {
          errors.uname = "Enter your name";
      }
      if (!values.email) {
          errors.email = "Enter a valid email address";
      }
      if (!values.password) {
          errors.password = "Enter a password";
      }

      return errors;
  }


  const handleSubmit = (e) =>{
    e.preventDefault();

   
    const isValid = registerValidation(input);
    setFormError(isValid);
    const data = {...input}
   //localStorage.setItem("user",JSON.stringify(input));
    if(isValid){
    if (localStorage.getItem("user")) {

         const getdata = JSON.parse(localStorage.getItem("user"));
         console.log("retrieve data", getdata);
         getdata.push(data);
    
        localStorage.setItem("user", JSON.stringify(getdata));
    } else {
        localStorage.setItem("user", JSON.stringify([data]));
    }
  
    navigate("/login")
  }
  }

  

  return (
    <>
    <div className="container-reg">
       <form onSubmit={handleSubmit}>
        <div className="section">
          <div className="row">
            <div className="container">
              <div className="heading">
                <h3>Registration</h3>
              </div>

              <label htmlFor="Name">Name</label>
              <input
                type="text"
                className="input"
                name="uname"
                value={input.uname}
                onChange={(e)=>
                    setInput({
                        ...input,
                        [e.target.name]:e.target.value,
                    })
                }
              />
             <p className="span1">{formError.uname}</p>
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
             <p>{formError.email}</p>
             <label htmlFor="password">password</label>
              <input
                type="text"
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
              <p>{formError.password}</p>
              <div className="bottom">
                <input className="input" type="submit" value="submit" />
                <Link to="/login">Login Here</Link>
              </div>
            </div>
          </div>
        </div>
      </form>
      
    </div>
    </>
  )
}

export default Registration;
