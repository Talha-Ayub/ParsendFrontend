import Header from "../../components/header";
import Footer from "../../components/footer";
import "./accountDetails.css";
import InputField from "../../components/InputField";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function AccountDetails() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState({
    name: "",
    city: "",
    destinationCity: "",
    currentLocation: "",
    destinationLocation: "",
  });
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const handleChange = (event) => {
    const { name, value } = event.target;

    setUserData((prevFormsData) => ({
      ...prevFormsData,
      [name]: value,
    }));
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3500/users/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUserData(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const logout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("token");
    localStorage.removeItem("isRider");

    navigate("/");
  };

  const handleClick = async () => {
    try {
      const formData = new FormData();

      formData.append("email", userData.email);
      formData.append("cnic", userData.cnic);
      formData.append("phone_no", userData.phone);
      formData.append("name", userData.name);
      formData.append("city", userData.city);
      formData.append("destinationCity", userData.destinationCity);
      formData.append("currentLocation", userData.currentLocation);
      formData.append("destinationLocation", userData.destinationLocation);

      await axios
        .patch(`http://localhost:3500/users/${userId}`, userData)
        .then((response) => {
          navigate("/home");
        })
        .catch((error) => {
          // setErrors(error.response.data.errors);
        });
    } catch (error) {}
  };

  console.log(userData);

  return (
    <>
      <Header />
      <hr />
      <div className="wrap">
        <h2>Account Details</h2>
        <br />
      </div>
      <div className="profileChange">
        <button onClick={logout}>Logout</button>
      </div>
      <br />
      <br />

      <div className="account-container fcc">
        <div>
          <label>Name</label>
          <InputField
            ph="Talha Ayub"
            size="40%"
            name="name"
            value={userData?.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Current Address</label>
          <InputField
            ph="Street 56,PCSIR"
            size="40%"
            name="currentLocation"
            value={userData?.currentLocation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Destination Address</label>
          <InputField
            ph="Street 56,PCSIR"
            size="40%"
            name="destinationLocation"
            value={userData?.destinationLocation}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Current city</label>
          <InputField
            ph="Lahore"
            size="40%"
            name="city"
            value={userData?.city}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Destination city</label>
          <InputField
            ph="Islamabad"
            size="40%"
            name="destinationCity"
            value={userData?.destinationCity}
            onChange={handleChange}
          />
        </div>

        <div>
          <label>Phone Number</label>
          <InputField
            ph="Street 56,PCSIR"
            size="40%"
            name="phone_no"
            value={userData?.phone_no}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>CNIC</label>
          <InputField
            ph="3520256176105"
            size="40%"
            name="cnic"
            value={userData?.cnic}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Email</label>
          <InputField
            ph="talha.talha784@gmail.com"
            size="40%"
            name="email"
            value={userData?.email}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="confrm">
        <button onClick={handleClick}>Confirm</button>
      </div>

      <hr />
      <Footer />
    </>
  );
}
export default AccountDetails;
