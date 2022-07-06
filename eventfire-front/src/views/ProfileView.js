import Navbar from "../navbar/Navbar";
import React, { useState, useEffect } from "react";
import Box from "@material-ui/core/Box";
import TextField from "@material-ui/core/TextField";

export default function ProfileView() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("user"));
    if (items) {
      setItems(items);
    }
    console.log(items);
  }, []);
  return (
    <div>
      <Navbar className="nav" />
      <div className="topHeader"></div>
      <div className="CenterBox">
        <Box display="flex" flexDirection="column" justifyContent="center">
          <h2>Account Details</h2>
          <br />
          <TextField
            name="FirstName"
            label="First Name"
            type="foodname"
            value={items.firstName}
            variant="filled"
          />
          <br />
          <TextField
            name="FirstName"
            label="Last Name"
            value={items.lastName}
            variant="filled"
          />
          <br />
          <TextField
            name="Fat"
            label="Full Name"
            type="fat"
            value={items.firstName + " " + items.lastName}
            variant="filled"
          />
           <br />
          <TextField
            name="Fat"
            label="Email"
            type="fat"
            value={items.email}
            variant="filled"
          />
        </Box>
      </div>
    </div>
  );
}
