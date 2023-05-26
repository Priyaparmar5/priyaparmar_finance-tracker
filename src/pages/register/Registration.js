import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { registerTransaction } from "../../redux/ducks/UserReducer";
function Registration() {
  const navigate = useNavigate();
  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.value);
  console.log(user, "usersaa");

  const [input, setInput] = useState(initialValues);

  const schema = yup.object().shape({
    name: yup.string().required("name is required"),
    email: yup
      .string()
      .email()
      .required("Email is required")
      .test("email", "Email already exists", function (value) {
        const storedData = user;
        return (
          storedData.filter((data) => data.email === value).length === 0 ||
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

  const onSubmit = (data) => {
    const value = { ...data };
    console.log(value, "vallllsss");
    const storedData = {
      ...input,
      name: value.name,
      email: value.email,
      password: value.password,
    };
    console.log(storedData, "storeddd");

    const val = dispatch(registerTransaction(storedData)) || [];

    setInput(val);

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
                />
                <p className="span1">{errors.name?.message}</p>
                <label htmlFor="Email">Email</label>
                <input
                  type="text"
                  className="input"
                  {...register("email")}
                  name="email"
                />
                <p className="span1">{errors.email?.message}</p>
                <label htmlFor="password">password</label>
                <input
                  type="password"
                  className="input"
                  {...register("password")}
                  name="password"
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
