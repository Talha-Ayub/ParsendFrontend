import "./hero.css";
import ipath from "../../assets/images/home-bg.jpg";
import { useState } from "react";
import { Link } from "react-router-dom";

const Hero = () => {
  const [count, setCount] = useState({ name: "yusuf", number: 0 });

  function updateCount() {
    setCount({number:count.number + 1});
  }

  return (
    <div className="hero-container">
      <div className="front">
        <img className="img1" src={ipath} alt="Logo" />
      </div>

      <div className="tiles">
        <h1>
          PAR<spam>SEND</spam>
        </h1>
        <Link to="/parcels/create">
        <button >Post</button>
        </Link>
      </div>
    </div>
  );
};
export default Hero;
