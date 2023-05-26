import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { useGlobalContext } from "../../context/UsersContext";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
function Registration() {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const [input, setInput] = useState(initialValues);
  const [values, setValues] = useState();
  const { registerData, setRegisterData } = useGlobalContext();

  console.log("registerdata", registerData);

  const schema = yup.object().shape({
    name: yup.string().required("name is required"),
    email: yup
      .string()
      .email()
      .required("Email is required")
      .test("email", "Email already exists", function (value) {
        const storedData = registerData || [];
        return (
          storedData.filter((data) => data.email === value).length === 0 ||
          !value
        );
      }),
    password: yup.string().required("password is required").min(4).max(20),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  const handleChange = (e) => {
    setValues((previousValues) => ({
      ...previousValues,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    const data = { ...e };
    console.log(data, "dattaaaa");
    const storedData = {
      ...input,
      name: data.name,
      email: data.email,
      password: data.password,
    };
    const val = registerData || [];
    console.log(val, "val");
    val.push(storedData);
    setRegisterData(val);
    navigate("/login");

    console.log(data, "dataa");
  };

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
                  onChange={handleChange}
                />
                <p className="span1">{errors.email?.message}</p>
                <label htmlFor="password">password</label>
                <input
                  type="password"
                  className="input"
                  {...register("password")}
                  name="password"
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
  );
}

export default Registration;
