import "./HomepageSection.css";
import { Link } from "react-router-dom";

function HomepageSection(props) {
  return (
    <div className="home-section-container">
      <h4 className="Title"> {props.title}</h4>
      <h4>To pick the parcel.Click the below button</h4>
      <Link to={props.href}>
        <button className="browse_find">{props.buttonText}</button>
      </Link>
    </div>
  );
}
export default HomepageSection;
