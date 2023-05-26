import { React, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useCookies } from "react-cookie";

import * as yup from "yup";
function Login() {
  const [cookies, setCookie] = useCookies(["name"]);

  const navigate = useNavigate();

  const initialValues = {
    email: "",
    password: "",
  };
  const [input, setInput] = useState(initialValues);
  const [formError, setFormError] = useState({});
  const loggedusers = useSelector((state) => state.users.value);

  const schema = yup.object().shape({
    email: yup
      .string()
      .email()
      .required("Email is required")
      .test("email", "Please enter valid email", function (value) {
        const storedData = loggedusers || [];
        return (
          storedData.filter((data) => data.email === value).length !== 0 ||
          !value
        );
      }),
    password: yup.string().min(4).max(20).required("password is required"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleChange = (e) => {
    setInput((previousValues) => ({
      ...previousValues,
      [e.target.name]: e.target.value,
    }));
  };

  console.log(loggedusers, "loggeduserrrrr");

  const onSubmit = (data) => {
    console.log("logindataa", data);
    const storedData = {
      email: data.email,
      password: data.password,
    };
    console.log(data.email, "data.email;;");
    if (loggedusers) {
      let flag = false;

      for (const key in loggedusers) {
        console.log(loggedusers[key].email, "loggggemailll");
        console.log("in for loop", loggedusers);
        if (
          loggedusers[key].email === data.email &&
          loggedusers[key].password === data.password
        ) {
          flag = true;
          break;
        }
      }
      if (flag === true) {
        let result = "";
        const str =
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        const charLength = str.length;
        let counter = 0;
        while (counter < 33) {
          result += str.charAt(Math.floor(Math.random() * charLength));
          counter += 1;
        }
        const token = result;
        setCookie("name", token, { maxAge: 3600 }, { path: "/" });

        // localStorage.setItem('token', JSON.stringify(input))
        navigate("/ViewData");
      } else {
        alert("Please enter valid email and password");
      }
    }
  };

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
              <p className="span1">{errors.email?.message}</p>

              <label htmlFor="password">password</label>
              <input
                type="password"
                className="input"
                name="password"
                {...register("password")}
                //    value={input.email}
                onChange={handleChange}
              />
              <p className="span1">{errors.password?.message}</p>
              <div className="bottom">
                <input className="input" type="submit" value="submit" />
                <Link to="/public/registration">Register Here</Link>
              </div>
              <div></div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}

export default Login;
