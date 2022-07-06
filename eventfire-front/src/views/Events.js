import EventCard from "../cards/EventCard";
import Navbar from "../navbar/Navbar";

export default function Events(){
    return(
        <div>
            <Navbar className="nav" />
            <EventCard/>
        </div>
    )
}