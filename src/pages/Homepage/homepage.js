import Hero from "./hero";
import "./homepage.css";
import Header from "../../components/header";
import Homepage_why from "./homepage_why";
import Footer from "../../components/footer";
import HomepageSection from "./HomepageSection/HomepageSection";

function Homepage() {
  return (
    <>
      <Header />
      <Hero />
      <HomepageSection
        title="Send Parcel"
        body="If you want to send the parcel.Click on the link below"
        buttonText="Send"
        href="/parcels/create"
      />
      <HomepageSection
        title="Track Parcel"
        body="Click on the track button to track your parcel."
        buttonText="Track"
        href="/track"
      />
      <HomepageSection
        title="Find Parcel"
        body="To pick the parcel.Click the below button"
        buttonText="Browse"
        href="/parcels"
      />
      <Homepage_why />
      <br />
      <br />
      <Footer />
    </>
  );
}
export default Homepage;
