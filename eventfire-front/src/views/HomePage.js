import Navbar from "../navbar/Navbar";
import React from "react";
import RandomEventsCard from "../cards/RandomEventsCard";
import BookingCard from "../cards/BookingCard";


export default function HomePage() {
  return (
    <div class="row" >
      <Navbar className="nav" />
      <div class="column">
        <h2>Recommendations: </h2>
        <RandomEventsCard />
      </div>
      <div class="column">
        <h2>My Bookings</h2>
        <BookingCard/>
      </div>
    </div>

  );
}
