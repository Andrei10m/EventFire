import {Box} from "@mui/material";
import logo from "../assets/logo.png";
import background from "../assets/EventFire-logos.jpeg";
import HomePageStyle from "../views/HomePageStyle.css";
import SearchBar from "./SearchBar";


export default function Navbar(){

    const styles = {
        paperContainer: {
            backgroundImage: `url(${background})`
        }
    };

    return(
        <Box style={styles.paperContainer}>
            <div  className="home-style" >
                <Box component="span" sx={{width: 600, height: 100}}>
                    <img id="logo" alt="logo" src={logo} />
                </Box>
                <Box sx={{width: 850, height: 100}}>
                    <SearchBar className="nav" />
                </Box>
                <Box component="span" sx={{width: 550, height: 100}}>
                    <img id="logo" alt="logo" src={logo} />
                </Box>
            </div>
        </Box>
    );


}