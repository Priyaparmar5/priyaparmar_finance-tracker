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

  //localStorage.setItem("user", JSON.stringify([values]));
  useEffect(() => {
    //  localStorage.setItem("user", JSON.stringify(values));
  });

  const handleChange = (e) => {
    setValues((previousValues) => ({
      ...previousValues,
      [e.target.name]: e.target.value,
    }));
  };


  // const handleSubmit = (e) => {
  //   e.preventDefault();

  //   const data = { ...input }

  // }

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
    // val.push(storedData);
    //   const reg =dispatch(registerTransaction(storedData));
    // console.log(reg,"reggg");
    //localStorage.setItem("user", JSON.stringify(val));
    //    console.log(schema,"isvalidd");

    const val = dispatch(registerTransaction(storedData)) || [];
    //   val.push(storedData);
    setInput(val);
    //   localStorage.setItem("user", JSON.stringify(val));

    // if (user) {
    //   const retrivedata = user;

    //   // console.log("in update");
    //   // // for (const e in retrivedata) {
    //   // //   if (parseInt(retrivedata[e].id) === parseInt(id)) {
    //   // //     data["id"] = id;
    //   // //     retrivedata[e] = data;
    //   // //   }
    //   // //
    //   // // }
    //   // const dispatchData= dispatch(updateTransaction({ id:data.id,value}));

    //   // setFormData(dispatchData);
    //   // console.log(dispatchData, "dispatchData");
    //   // console.log(id, "dataaaaaid");
    //   // alert("update successfully");

    //   console.log("in insert");
    //   const previd = retrivedata[retrivedata.length - 1].id;
    //   console.log(previd, "previd");
    //   storedData["id"] = parseInt(previd) + 1;
    //   console.log(storedData["id"], "newid");
    //   // retrivedata = data;
    //   //retrivedata.push(storedData);
    //  // console.log(user, "rsssss");
    //   dispatch(registerTransaction(storedData));
    //   setInput(storedData);
    //   console.log(retrivedata, "data");
    //   alert("insert successfully");
    // }

    //localStorage.setItem("key", JSON.stringify(retrivedata));

    //    navigate("/ViewData");
    //console.log("transactionnn", dispatch(addTransaction));

    navigate("/login");
    //}

    //localStorage.setItem("user", JSON.stringify(data));
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
                  // onChange={handleChange}
                />
                <p className="span1">{errors.name?.message}</p>
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
