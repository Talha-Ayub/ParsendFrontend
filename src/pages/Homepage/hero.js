import "./hero.css";
import ipath from "../../assets/images/home-bg.jpg";
import { useState } from "react";

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
        {/* <h3 className="desc">The courier service you deserve</h3> */}
        <h3 className="desc"> {count.name} Count = {count.number}</h3>
        <button onClick={updateCount}>Add One</button>
      </div>
    </div>
  );
};
export default Hero;
