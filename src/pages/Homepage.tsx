import Carouseli from "../components/Carousel"; 
import UpcomingEvents from "../components/UpcomingEvents/UpcomingEvents";
import Footer from "../components/Footer/Footer";
import Navbari from "../components/Navbar/Navbar";
import PopularEvents from "../components/PopularEvents/PopularEvents";

function Homepage() {
  return (
    <div>
      <Navbari />
      <Carouseli />
      <PopularEvents/>
      <UpcomingEvents/>
      <Footer/>
    </div>
  );
}

export default Homepage;
