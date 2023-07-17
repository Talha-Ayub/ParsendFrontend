import InputField from "../../components/InputField";
import Footer from "../../components/footer";
import Header from "../../components/header";
import "./suggestion.css";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Suggestion() {
  const [suggestion, setSuggestion] = useState("");
  const navigate = useNavigate();

  const handleChange = (event) => {
    setSuggestion(event.target.value);
  };

  const handleClick = (event) => {
    event.preventDefault();

    try {
      const userId = localStorage.getItem("userId");
      const token = localStorage.getItem("token");

      axios
        .post(
          `http://localhost:3500/users/${userId}/feedback`,
          {
            message: suggestion,
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          navigate("/home");
        })
        .catch((error) => {
          console.error(error);
        });
      // Process the response or update component state
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Header />
      <div className="suggestion-container">
        <form className="suggestion-in">
          <InputField ph="Full Name" />
          <br></br>
          <br></br>
          {/* <label>Suggestion/Complain</label> */}
          <br />
          <InputField
            className="sug"
            ph="Suggestions"
            height="50px"
            name="suggestion"
            value={suggestion}
            onChange={handleChange}
          />
          <br />
          <br />

          <button onClick={handleClick}>Submit</button>
        </form>
      </div>
      <div className="foooter">
        <Footer />
      </div>
    </>
  );
}
export default Suggestion;
