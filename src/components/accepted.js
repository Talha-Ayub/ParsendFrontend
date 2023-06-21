import "./accepted.css";
import Footer from "./footer";
import Header from "./header";
function Accepted(){
    return(
        <>
        <Header/>
        <hr/>
        <div className="accept">
            
               
            <h5>Your order has been accepted</h5>
            <br/>
            <button>Go to homepage</button>
        </div>
        <hr/>
        <br/>
        <br/>
        <Footer/>
        </>
    )
}
export default Accepted;