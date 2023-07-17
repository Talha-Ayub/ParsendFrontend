import "./App.css";
import Header from "./components/header";
// import Hero from "./components/hero";
import Homepage from "./pages/Homepage/homepage";
// import Homepage_send from "./components/homepage_send";
// import Homepage_track from "./components/homepage_track";
// import Homepage_find from "./components/homepage_find";
// import Homepage_why from "./components/homepage_why";
// import Footer from "./components/footer";
import Create_account from "./components/create_account";
import Login from "./components/login";
import Accepted from "./components/accepted";
import CreateParcel from "./pages/CreateParcel/CreateParcel";
import LiveTrack from "./pages/liveTrack/LiveTrack";
import Suggestion from "./pages/suggestion/suggestion";
import Confirmed from "./pages/confirmed/confirmed";
import Progress from "./pages/progress/progress";
import Order from "./pages/Order/Order";
import AccountDetails from "./pages/accountDetails/accountDetails";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import AvailableParcels from "./pages/AvailableParcels/AvailableParcels";
import ParcelDetails from "./pages/ParcelDetails/ParcelDetails";
import Chat from "./pages/Chat/Chat";
import ChatBox from "./pages/ChatBox/ChatBox";
import History from "./pages/History/History";

function App() {
  const userId = localStorage.getItem("userId");

  return (
    <BrowserRouter>
        {userId ? (
          <Routes>
            <Route exact path="/home" Component={Homepage} />
            <Route exact path="/accepted" Component={Accepted} />
            <Route exact path="/parcels/create" Component={CreateParcel} />
            <Route exact path="/parcels" Component={AvailableParcels} />
            <Route exact path="/parcels/:id" Component={ParcelDetails} />
            <Route exact path="/track" Component={LiveTrack} />
            <Route exact path="/order" Component={Order} />
            {/* <Route exact path="/chats/:id" Component={Chat} /> */}
            <Route exact path="/chatbox" Component={ChatBox} />
            <Route exact path="/history" Component={History} />
            <Route exact path="/suggestion" Component={Suggestion} />
            <Route exact path="/account" Component={AccountDetails} />
            <Route exact path="/" Component={Login} />
          </Routes>
        ) : (
          <Routes>
            <Route exact path="/home" Component={Homepage} />

            <Route exact path="/" Component={Login} />
            <Route exact path="/register" Component={Create_account} />
          </Routes>
        )}
        {/* <Route exact path="/about" Component={Send_parcel} /> */}
    </BrowserRouter>
  );
}

export default App;
