import { useState } from "react";
import { Link, useNavigate } from 'react-router-dom'

function Registration() {

  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };
  const [input, setInput] = useState(initialValues);
  const [formError, setFormError] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };


  const registerValidation = (values) => {
    const errors = {};
    const existUser =JSON.parse(localStorage.getItem("user"));

    if (!input.name.trim()) {
      errors.name = "Name is required";
    }
   
    for (const key in existUser) {
      if ((existUser[key].email === input.email)) {
        errors.email = "email already exist"
      }
      else if (!input.email.trim()) {
        errors.email = "Email is required";
      } else if (!/\S+@\S+\.\S+/.test(input.email)) {
        errors.email = "Email is invalid";
      }
    }

    if (!input.password.trim()) {
      errors.password = "Password is required";
    }
    else if (input.password.length < 6) {
      errors.password ="password must be 6 characters"
    }
      
    if (Object.keys(errors).length === 0) {
      // localStorage.setItem(input.email, JSON.stringify(input));
    
      if (localStorage.getItem("user")) {

        const getdata = JSON.parse(localStorage.getItem("user"));
        console.log("retrieve data", getdata);
        getdata.push(input);

        localStorage.setItem("user", JSON.stringify(getdata));
      } else {
        localStorage.setItem("user", JSON.stringify([input]));
      }
      navigate("/login")
    }
    setFormError(errors);
  }


  const handleSubmit = (e) => {
    e.preventDefault();

    const isValid = registerValidation();
    //  setFormError(isValid);
    console.log(isValid,"isvalid");
  
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
                  name="name"
                  value={input.name}
                  onChange={handleInputChange}
                />
                <p className="span1">{formError.name}</p>
                <label htmlFor="Email">Email</label>
                <input
                  type="text"
                  className="input"
                  name="email"
                  value={input.email}
                  onChange={handleInputChange}

                />
                <p className="span1">{formError.email}</p>
                <label htmlFor="password">password</label>
                <input
                  type="password"
                  className="input"
                  name="password"
                  value={input.password}
                  onChange={handleInputChange}

                />
                <p className="span1">{formError.password}</p>
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