import "./NavbarStyle.css";
import {Box, Button} from "@mui/material";
import {AccountCircleRounded, HomeMaxRounded, LocalActivityRounded} from "@mui/icons-material";
import {useNavigate} from "react-router-dom";

export default function SearchBar(){

    const navigate = useNavigate();

    return(
        <div className= "nav-style" >
            <Box component="span"  sx={{width: 180, height: 50}}>
                <Button variant="outlined" startIcon={<HomeMaxRounded/>} onClick={()=>{navigate("/Home")}}>
                    Home
                </Button>
            </Box>
            <Box component="span"  sx={{width: 180, height: 50}}>
                <Button variant="outlined" startIcon={<LocalActivityRounded/>} onClick={()=>{navigate("/Events")}}>
                    Events
                </Button>
            </Box>
            <Box component="span" sx={{width: 180, height: 50}}>
                <Button variant="outlined" startIcon={<AccountCircleRounded/>} onClick={()=>{navigate("/Profile")}}>
                    Account
                </Button>
            </Box>
        </div>
    )
}