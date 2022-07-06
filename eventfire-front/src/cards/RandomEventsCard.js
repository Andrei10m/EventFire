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
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import BookingService from "../service/BookingService";
import {
  createMuiTheme,
  withStyles,
  makeStyles,
  ThemeProvider,
} from "@material-ui/core/styles";

export default function RandomEventsCard() {
  const initialValue = [];

  const [events, setEvents] = useState(initialValue);

  const [expanded, setExpanded] = useState(false);
  const [user, setUser] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [successful, setSuccessful] = useState(false);
  const [message, setMessage] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const items = JSON.parse(localStorage.getItem("user"));
    if (items) {
      setUser(items);
    }
    console.log(items);

    fetchRandomEvents();
  }, []);

  const handleClose = () => {
    setOpen(false);
  };

  const handleFinish = (e) => {
    const data = {
      eventId: events[selectedIndex].eventId,
      userId: user.id,
    };

    e.preventDefault();
    setMessage("");
    setSuccessful(false);

    BookingService.create(data).then((response) => {
      console.log(response);
      if (response.data.bookingId != null) {
        setOpen(false);
      }
      setMessage(response.data.message);
      setSuccessful(true);
      setOpen(false);
    });
  };

  const BlackColorButton = withStyles((theme) => ({
    root: {
      color: "#FFF",
      backgroundColor: "#f44336",
      "&:hover": {
        backgroundColor: "##f44336",
      },
    },
  }))(Button);

  const fetchRandomEvents = () => {
    axios
      .get("http://localhost:8080/events/getRandomEventsByCount?count=7")
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

  function handleClick(data) {
    console.log("selected index : " + data.currentTarget.id);
    setSelectedIndex(data.currentTarget.id);
    setOpen(true);
  }

  if (events.length > 0) {
    return (
      <Grid sx={{ flexGrow: 1 }} container spacing={2}>
        {events &&
          events.map((data, index) => (
            <Grid key={index} item>
              <Card sx={{ minWidth: 250, maxWidth: 345 }}>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                      {data.eventName.substring(0, 2)}
                    </Avatar>
                  }
                  title={data.eventName}
                  subheader={data.eventDate}
                />
                <CardContent>
                  <Typography variant="body2" color="text.secondary">
                    <span style={{ fontWeight: "bold" }}>Ticket Price: </span>{" "}
                    {data.price} Lei
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
                    <span style={{ fontWeight: "bold", marginBottom: "2rem" }}>
                      Details:{" "}
                    </span>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Description: </span>
                      {data.eventDescription}
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Location: </span>
                      {data.eventLocation}
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Time: </span>
                      {data.eventTime}
                    </Typography>
                    <Typography>
                      <span style={{ fontWeight: "bold" }}>Seats: </span>
                      {data.seats}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <div>
                      <BlackColorButton
                        id={index}
                        variant="contained"
                        color="primary"
                        type="submit"
                        onClick={handleClick}
                        startIcon={<BookIcon />}
                        size="small"
                      >
                        Reserve ticket
                      </BlackColorButton>
                      <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>EventFire</DialogTitle>
                        <DialogContent>
                          <DialogContentText>
                            Select the number of tickets:
                          </DialogContentText>
                          <TextField
                            autoFocus
                            fullWidth
                            id="outlined-number"
                            label="Number"
                            type="number"
                            variant="standard"
                            margin="dense"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                        </DialogContent>
                        <DialogActions>
                          <Button onClick={handleClose}>Cancel</Button>
                          <Button onClick={handleFinish}>Finish</Button>
                        </DialogActions>
                      </Dialog>
                    </div>
                  </CardActions>
                </Collapse>
              </Card>
            </Grid>
          ))}
      </Grid>
    );
  }
}
