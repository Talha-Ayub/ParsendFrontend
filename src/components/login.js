import InputField from "./InputField";
import "./login.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";

function Login(props) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (event) => {
    setFormData((prevFormData) => ({
      ...prevFormData,
      [event.target.name]: event.target.value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    console.log(formData);

    axios
      .post("http://localhost:3500/login", formData)
      .then((response) => {
        localStorage.setItem("token", response.data.accessToken);
        localStorage.setItem("userId", response.data.userId);
        localStorage.setItem("isRider", response.data.isRider);
        navigate("/");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="Login-container">
      <div className="login">
        <h2>Login</h2>
        <form className="log-in">
          <InputField
            ph="Email"
            size=""
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          <br />
          <br />
          <InputField
            ph="Password"
            size=""
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <br />
          <br />

          <button onClick={handleSubmit}>Login</button>
        </form>
      </div>
    </div>
  );
}
export default Login;
