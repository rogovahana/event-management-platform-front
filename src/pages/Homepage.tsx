import Carouseli from "../components/Carousel"; 
import UpcomingEvents from "../components/UpcomingEvents";
import Footer from "../components/Footer";
import Navbari from "../components/Navbar";

function Homepage() {
  return (
    <div>
      <Navbari />
      <Carouseli />
      <UpcomingEvents/>
      <Footer/>
    </div>
  );
}

export default Homepage;
