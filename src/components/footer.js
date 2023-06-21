import "./footer.css";
import fb from "../assets/images/fb1.png";
import insta from "../assets/images/instagram1.png";
import twitter from "../assets/images/twitter1.png";
import { Link } from "react-router-dom";

function Footer() {
  return (
    <div className="main">
      <div className="copyright">
        <h2>Parsend</h2>
        <br />
        <p>Copyrights © 2021 Luxe</p>
        <p>All rights reserved</p>
        <div className="social">
          <img className="fb" src={fb} alt="fb" />
          <img className="insta1" src={insta} alt="insta" />
          <img className="twit" src={twitter} alt="twitter" />
        </div>
      </div>

      <div className="cd">
        {/* <hr/> */}
        <h2>Links</h2>
        <br />
        <Link className="aa" to="/send_parcel">
          Send
        </Link>
        <br />
        <Link className="aa" to="/availableparcel">
          Browse
        </Link>
        <br />
        <Link className="aa" to="/">
          Track
        </Link>
        <br />
        <Link className="aa" to="/">
          About Us
        </Link>
        <br />
        <Link className="aa" to="/">
          Contact Us
        </Link>
        <br />
        <Link className="aa" to="/">
          Complain & Suggestions
        </Link>
        <br />
      </div>
    </div>
  );
}
export default Footer;
