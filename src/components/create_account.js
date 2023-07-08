import { useNavigate } from "react-router-dom";
import "./create_account.css";
import InputField from "./InputField";
import axios from "axios";
import { useState } from "react";

function Create_account() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone_no: "",
    cnic: "",
    city: "",
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
      .post("http://localhost:3500/register", formData)
      .then((response) => {
        console.log(response.data);
        navigate("/login");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="create-container">
      <div className="create">
        <h2>Create Account</h2>
        <form className="create-in">
          <InputField
            ph="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
          />
          <br></br>
          <br></br>
          <InputField
            ph="Phone"
            size=""
            name="phone"
            value={formData.phone}
            onChange={handleChange}
          />
          <br />
          <br />
          <InputField
            ph="CNIC"
            size=""
            name="cnic"
            value={formData.cnic}
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
            ph="City"
            size=""
            name="city"
            value={formData.city}
            onChange={handleChange}
          />
          <br />
          <br />
          <button onClick={handleSubmit}>Confirm</button>
        </form>
      </div>
    </div>
  );
}
export default Create_account;
