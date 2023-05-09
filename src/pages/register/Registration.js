import { useState,useEffect } from "react";
import { useForm } from 'react-hook-form'
import { Link, useNavigate,  } from 'react-router-dom'
import  {yupResolver} from "@hookform/resolvers/yup"
import * as yup from 'yup'
function Registration() {

  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  // const getForm = () => {
  //   const storedValues = localStorage.getItem("user");
    
  //   if (!storedValues) 
  //     return {
  //       name: "",
  //       email: "",
  //       password:""
  //     };
  //     console.log("storedd",storedValues);
  //   return JSON.parse([storedValues]);
  // };
  const [input, setInput] = useState(initialValues);
  const [values, setValues] = useState();
  const [formError, setFormError] = useState({});

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const schema =  yup.object().shape({
    name : yup.string().required("name is required"),
    email : yup.string().email().required("Email is required")
    .test("email", "Email already exists", function (value) {
      const storedData = JSON.parse(localStorage.getItem("user")) || [];
      return (
        storedData.filter((data) => data.email === value).length === 0 || !value
      );
    }),
    password : yup.string().min(4).max(20).required("password is required"), 
  })

  const {
    register,
    handleSubmit,
    formState:{errors}
  }=useForm({resolver: yupResolver(schema)});
 
  //localStorage.setItem("user", JSON.stringify([values]));
  useEffect(() => {
  //  localStorage.setItem("user", JSON.stringify(values));

 
  
  });

  const handleChange = (e) => {
    setValues((previousValues) => ({
      ...previousValues,
      [e.target.name]: e.target.value
    }));
  };

  const registerValidation = (values) => {
    const errors = {};
    const existUser =JSON.parse(localStorage.getItem("user"));

    if (!input.name.trim()) {
      errors.name = "Name is required";
    }
    // if (!input.email.trim()) {
    //   errors.email = "Email is required";
    // } else if (!/\S+@\S+\.\S+/.test(input.email)) {
    //   errors.email = "Email is invalid";
    // }
    // else if (JSON.parse(localStorage.getItem(input.email))) {
    //   errors.email = "Email already exists";
    // }

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


  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const data = { ...input }
  
  // }

  
  const onSubmit = (data) =>{ 

      const storedData ={
        name:data.name,
        email: data.email,
        password: data.password,
      }
      const val = JSON.parse(localStorage.getItem("user")) || [];
      val.push(storedData);
      localStorage.setItem("user", JSON.stringify(val));
      //    console.log(schema,"isvalidd");
  //  if(Object.keys(errors).length === 0) {

  //       if (localStorage.getItem("user")) {
  //       console.log("hellloo");

  //       const getdata = JSON.parse(localStorage.getItem("user"));
  //       console.log("retrieve data", getdata);
  //       getdata.push(values);
  //       console.log("valuess",data);
  
  //       localStorage.setItem("user", JSON.stringify(getdata));
  //     } else {
  //       localStorage.setItem("user", JSON.stringify([values]));
  //     }
    navigate("/login")
   //}
    
   //localStorage.setItem("user", JSON.stringify(data));
    console.log(data,"dataa");
  }

  return (
    <>
      <div className="container-reg">
        <form onSubmit={handleSubmit(onSubmit)}>
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
                  {...register("name")}
                //  value={input.name}
                  onChange={handleChange}
                />
                <p className="span1">{errors.name?.message}</p>
                <label htmlFor="Email">Email</label>
                <input
                  type="text"
                  className="input"
                  {...register("email")}
                  name="email"
              //    value={input.email}
                 onChange={handleChange}

                />
                <p className="span1">{errors.email?.message}</p>
                <label htmlFor="password">password</label>
                <input
                  type="password"
                  className="input"
                  {...register("password")}
                  name="password"
               //   value={input.password}
                  onChange={handleChange}

                />
                <p className="span1">{errors.password?.message}</p>
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
