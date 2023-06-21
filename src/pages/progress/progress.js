import "./progress.css";
import Footer from "../../components/footer";
import Header from "../../components/header";
function Progress(){
    return(
        <>
        <Header/>
        <hr/>
        <div className="progress">
            
               
            <h5>Your order has been confirmed</h5>
            <br/>
            <br/>
            <br/>
            <div className="liness">
                <p>______________<spam className="s1">.</spam>______________<spam className="s1">{'\u2B24'}</spam>______________<spam className="s1">{'\u2B24'}</spam></p>
            
            </div>
            <br/>
            <div div className="con">
            <p>Order Confirmation<spam className="s2">Requesting rider</spam><spam className="s2">Pickup</spam><spam className="s2">Order Deliveres</spam></p>
            </div>
        </div>
        
        <hr/>
        <Footer/>
        </>
    )
}
export default Progress;