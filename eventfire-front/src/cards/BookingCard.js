import axios from "axios";
import React, { useState, useEffect } from "react";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Collapse,
  Grid,
} from "@mui/material";
import Avatar from "@mui/material/Avatar";
import { red } from "@mui/material/colors";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Button from "@mui/material/Button";
import BookIcon from "@mui/icons-material/Book";
import { ExpandMore } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import eventDataService from "../service/EvService";
import Container from "@material-ui/core/Container";

export default function BookingCard() {
  const initialValue = [];

  const [events, setEvents] = useState(initialValue);

  const [expanded, setExpanded] = useState(false);
  const [user, setUser] = useState([]);


  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("user"));
    if (items) {
      setUser(items);
    }
    console.log(items);

    fetchBookingEvents();
  }, []);

  const fetchBookingEvents = () => {
      const userId =JSON.parse(localStorage.getItem("user")).id;
    axios
      .get("http://localhost:8080/bookings/getBookingsByUserId?userId="+userId)
      .then((res) => {
        const response = res.data.object;
        console.log(setEvents);
        if (response) {
          setEvents(response);
        }
        console.log(response);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const navigate = useNavigate();

  function handleClick() {
    navigate("/EventDetails");
  }

  if (events.length > 0) {
    return (
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        {events &&
          events.map((data,index) => (
            <Grid key={index} item>
              <Card sx={{ minWidth:250, maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {data.event.eventName.substring(0, 2)}
                    </Avatar>
                  }
                  title={data.event.eventName}
                  subheader={data.event.eventDate}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    The fun awaits!
                  </Typography>
                </CardContent>
                <CardActions disableSpacing>
                  <ExpandMore
                    expand={expanded}
                    onClick={handleExpandClick}
                    aria-expanded={expanded}
                    aria-label="show more"
                  >
                    <ExpandMoreIcon />
                  </ExpandMore>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                  <CardContent>
                  <span style={{fontWeight: 'bold',marginBottom:'2rem'}}>Details: </span>                    
                  <Typography><span style={{fontWeight: 'bold'}}>Description: </span>{data.event.eventDescription}</Typography>
                    <Typography><span style={{fontWeight: 'bold'}}>Location: </span>{data.event.eventLocation}</Typography>
                    <Typography><span style={{fontWeight: 'bold'}}>Time: </span>{data.event.eventTime}</Typography>
                  </CardContent>
                </Collapse>
              </Card>
            </Grid>
          ))}
      </Grid>
    );
  }
}
