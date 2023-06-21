import Header from "../../components/header";
import Footer from "../../components/footer";
import "./accountDetails.css";
import InputField from "../../components/InputField";

function AccountDetails() {
  return (
    <>
    <Header />
      <hr />
    <div className="wrap">
      
      
      <h2>Account Details</h2>
      <br />
      </div>
      <div className="profileChange">
        <button>Change profile</button>
      </div>
      <br />
      <br />

      <div className="account-container">
        <form className="details">
          <label className="CurrentAdres">Current Address</label>
          <InputField ph="Street 56,PCSIR" size="40%" />
          <br />
          <br />

          <label className="phne">Phone Number</label>
          <InputField ph="Street 56,PCSIR" size="40%" />
          <br />
          <br />

          <label className="cnic">CNIC</label>
          <InputField ph="3520256176105" size="40%" />
          <br />
          <br />

          <label className="mail">Email</label>
          <InputField ph="talha.talha784@gmail.com" size="40%" />
          <br />
          <br />
        </form>
      </div>
      <div className="confrm">
        <button>Confirm</button>
      </div>

      <hr />
      <Footer />
    </>
  );
}
export default AccountDetails;
