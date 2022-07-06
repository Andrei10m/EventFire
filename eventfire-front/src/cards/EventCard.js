import {
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Collapse,
    Grid,
    IconButton,
    styled
} from "@mui/material";
import Typography from "@mui/material/Typography";
import React, {useEffect, useState} from "react";
import axios from "axios";
import eventDataService from "../service/EvService";
import Button from "@mui/material/Button";
import {useNavigate} from "react-router-dom";
import BookIcon from "@mui/icons-material/Book";
import Avatar from "@mui/material/Avatar";
import { red } from '@mui/material/colors';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import BookingService from "../service/BookingService";
import {withStyles} from "@material-ui/core/styles";


export default function EventCard(){

    const [events, setEvents] = useState([]);
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [currentEvent, setCurrentEvent] = useState(null);
    const [currentIndex, setCurrentIndex] = useState(-1);
    const [expanded, setExpanded] = useState(false);
    const [open, setOpen] = useState(false);
    const [successful, setSuccessful] = useState(false);
    const [message, setMessage] = useState("");
    const [user, setUser] = useState([]);


    useEffect(()=>{
        const items = JSON.parse(localStorage.getItem("user"));
        if (items) {
          setUser(items);
        }
        console.log(items);
        
        retrieveEvents();
    },[]);

    const retrieveEvents =() => {
        eventDataService.getAll()
            .then(response => {
                setEvents(response.data);
                console.log(response.data);
            })
            .catch(e => console.log(e));
    };

    const refreshList = () => {
        retrieveEvents();
        setCurrentEvent(null);
        setCurrentIndex(-1);
    };

    const setActiveEvent = (event, index) => {
        setCurrentEvent(event);
        setCurrentIndex(index);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const fetchEvents = () => {
        axios
            .get("http://localhost:8080/events")
            .then((res) => {
                console.log(res);
            })
            .catch((err) => {
                console.log(err);
            });
    };

    const navigate = useNavigate();

    function handleClick(data) {
        console.log("selected index : " + data.currentTarget.id);
        setSelectedIndex(data.currentTarget.id);
        setOpen(true);
    }

    const BlackColorButton = withStyles((theme) => ({
        root: {
            color: "#FFF",
            backgroundColor: "#f44336",
            "&:hover": {
                backgroundColor: "##f44336",
            },
        },
    }))(Button);

    const ExpandMore = styled((props) => {
        const { expand, ...other } = props;
        return <IconButton {...other} />;
    })(({ theme, expand }) => ({
        transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
        marginLeft: 'auto',
        transition: theme.transitions.create('transform', {
            duration: theme.transitions.duration.shortest,
        }),
    }));

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const handleClickOpen = (data) => {
        console.log("selected index : "+data.currentTarget.id)
        setSelectedIndex(data.currentTarget.id);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleFinish = (e) => {
        const data = {
            "eventId":events[selectedIndex].eventId, 
            "userId" : user.id
        }

        e.preventDefault();
        setMessage("");
        setSuccessful(false);

        BookingService.create(data)
            .then((response) => {
                if(response.data.bookingId != null){
                    setOpen(false);
                }
                console.log(response)
                setMessage(response.data.message);
                setSuccessful(true);
                setOpen(false);
            }
            );
    };

    return (
        <Grid sx={{ flexGrow: 1 }} container spacing={2}>
            {events &&
                events.map((event, index) => (
                    <Grid key={index} item>
                    <Card sx={{ minWidth:250, maxWidth: 345 }}>
                        <CardHeader
                            avatar={
                                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                                    {event.eventName.substring(0, 2)}
                                </Avatar>
                            }
                            title = {event.eventName}
                            subheader= {event.eventDate}
                        />
                        <CardContent>
                            <Typography variant="body2" color="text.secondary">
                                Ticket Price: {event.price} Lei
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
                                <Typography paragraph>Details: </Typography>
                                <Typography>
                                    Description: {event.eventDescription}
                                </Typography>
                                <Typography>
                                   Location: {event.eventLocation}
                                </Typography>
                                <Typography>
                                    Starts at: {event.eventTime}
                                </Typography>
                                <Typography>
                                    Number of seats:{event.seats}
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