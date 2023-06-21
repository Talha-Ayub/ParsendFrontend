import InputField from "../../components/InputField";
import Footer from "../../components/footer";
import Header from "../../components/header";
import "./suggestion.css";

function Suggestion(props) {
  return (
    <>
    <Header/>
    <div className="suggestion-container">

        <form className="suggestion-in">
          <InputField ph="Full Name" />
          <br></br>
          <br></br>
          <InputField ph="Email" size="" />
          <br />
          <br />
          <label>Suggestion/Complain</label>
          <br/>
          <InputField className="sug" ph="" height="50px" />
          <br />
          <br />
          
          <button>Submit</button>
        </form>
    </div>
    <div className="foooter">
    <Footer/>
    </div>
    </>
  );
}
export default Suggestion;
