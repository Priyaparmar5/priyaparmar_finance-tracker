import React,{ useState, useEffect ,FC} from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { registerTransaction } from "../../redux/ducks/UserReducer";
import { RootState } from "../../redux/rootReducer";
import { userDetail } from "../Transaction";


 const Registration:React.FC= ()=> {
  
  const navigate = useNavigate();

  const initialValues = {
    uname: "",
    email: "",
    password: "",
  };

  const dispatch = useDispatch();
  const user = useSelector((state:RootState) => state.users);
  console.log(user, "usersaa");
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

  const handleInputChange = (event:any) => {
    const { name, value } = event.target;
    setInput({ ...input, [name]: value });
  };

  const schema = yup.object().shape({
    uname: yup.string().required("name is required"),
    email: yup
      .string()
      .email()
      .required("Email is required"),
      // .test("email", "Email already exists", function (value) {
      //   const storedData = user;
      //   return (
      //     storedData.filter((data) => data.email === value).length === 0 ||
      //  .   !value
      //   );
      // }),
    password: yup.string().min(4).max(20).required("password is required"),
  });

  interface LoginFormInputs {
    uname : string;
    email: string;
    password: string; 
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>({ resolver: yupResolver(schema) });

  //localStorage.setItem("user", JSON.stringify([values]));
  useEffect(() => {
    //  localStorage.setItem("user", JSON.stringify(values));
  });

  

 
  const onSubmit = (data: any) => {
    const value = { ...data };
    console.log(value, "vallllsss");
    const storedData = {
      ...input,
      uname: value.uname,
      email: value.email,
      password: value.password,
    };
    console.log(storedData, "storeddd");
    // val.push(storedData);
    //   const reg =dispatch(registerTransaction(storedData));
    // console.log(reg,"reggg");
    //localStorage.setItem("user", JSON.stringify(val));
    //    console.log(schema,"isvalidd");

    const val = dispatch(registerTransaction(storedData)) || [];
    //setInput(val);
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
                  //name="uname"
                  {...register("uname")}
                  //  value={input.name}
                  // onChange={handleChange}
                />
                <p className="span1">{errors.uname?.message}</p>
                <label htmlFor="Email">Email</label>
                <input
                  type="text"
                  className="input"
                  {...register("email")}
                  name="email"
                  //    value={input.email}
                  //  onChange={handleChange}
                />
                <p className="span1">{errors.email?.message}</p>
                <label htmlFor="password">password</label>
                <input
                  type="password"
                  className="input"
                  {...register("password")}
                  name="password"
                  //   value={input.password}
                  //   onChange={handleChange}
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
