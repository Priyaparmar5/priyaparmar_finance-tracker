import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Home() {
  const initialValues = {
    email: "",
    password: "",
  };
  const [input, setInput] = useState([]);
  const username = JSON.parse(localStorage.getItem("user"));
  // for (const e in username){
  // if(input.email ===  loggeduser[e].email && input.password === loggeduser[e].password)
  //   {
  //     // localStorage.setItem("logged in",true)
  //     localStorage.setItem("token",generate_token(32))
  //     navigate("/");
  //   }else{
  //     alert("wrong email or password")
  //   }
  // }
  const navigate = useNavigate();

  const handleLogout = (id) => {
    localStorage.removeItem("token");
    // setInput((user) => {
    //   return user.filter((toDel) =>
    //   toDel.id !== id,
    //   localStorage.removeItem("token")
    //   );
    // });

    navigate("/login");
  };
  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login");
    }
  }, []);
  return (
    <>
      <div>{/* // Hello {username.name} */}</div>
      <div>
        <input type="button" value="log out" onClick={handleLogout} />
      </div>
    </>
  );
}

export default Home;
