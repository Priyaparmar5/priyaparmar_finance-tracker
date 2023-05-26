import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector } from "react-redux";
import { useCookies } from "react-cookie";
import * as yup from "yup";
import { RootState } from "../../redux/rootReducer";

const Login: React.FC = () => {
  const [cookies, setCookie] = useCookies(["name"]);

  const navigate = useNavigate();

  interface LoginFormInputs {
    email: string;
    password: string;
  }

  const loggedusers = useSelector((state: RootState) => state.users.user);
  console.log(loggedusers, "loggeduserrrrr");

  const schema = yup.object().shape({
    email: yup
      .string()
      .email("Invalid Format")
      .required("Email is required")
      .test("email", "Please enter valid email", function (value) {
        const storedData = loggedusers || [];
        return (
          storedData.filter((data) => data.email === value).length !== 0 ||
          !value
        );
      }),
    password: yup
      .string()
      .required("password is required")
      .min(4)
      .max(20)
      .test("password", "Please enter valid password", function (value) {
        const storedData = loggedusers || [];
        return (
          storedData.filter((data) => data.password === value).length !== 0 ||
          !value
        );
      }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: yupResolver(schema) });

  const onSubmit = (data: any) => {
    console.log("logindataa", data);

    console.log(data.email, "data.email;;");
    if (loggedusers) {
      let flag = false;

      for (const user of loggedusers) {
        console.log(user.email, "loggggemailll");
        console.log("in for loop", loggedusers);
        if (user.email === data.email && user.password === data.password) {
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
        setCookie("name", token, { maxAge: 3600, path: "/" });

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
              <input type="text" className="input" {...register("email")} />
              <p className="span1">{errors.email?.message}</p>

              <label htmlFor="password">password</label>
              <input
                type="password"
                className="input"
                {...register("password")}
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
};

export default Login;
