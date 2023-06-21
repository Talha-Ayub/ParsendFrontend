import "./confirmed.css";
import Footer from "../../components/footer";
import Header from "../../components/header";
function Confirmed(){
    return(
        <>
        <Header/>
        <hr/>
        <div className="confirm">
            
               
            <h5>Your order has been confirmed</h5>
            <h5>OrderId is #A2B65278</h5>
            <button>Go to homepage</button>
        </div>
        <hr/>
        <Footer/>
        </>
    )
}
export default Confirmed;