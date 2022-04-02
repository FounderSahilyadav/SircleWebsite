import { useMediaQuery, useTheme } from "@material-ui/core";
import { Fragment } from "react";
import PCNavbar from "./PCNavbar";
import PhoneNavbar from "./PhoneNavbar";

const Navbar = ({ handleClickOpen }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(1100)); // Checking the display size

    return (
        // To display the navbar according to the display size
        <Fragment>
            {isMobile ? (
                <PhoneNavbar handleClickOpen={handleClickOpen} />
            ) : (
                <PCNavbar handleClickOpen={handleClickOpen} />
            )}
        </Fragment>
    );
};

export default Navbar;
