import { useMediaQuery, useTheme } from "@material-ui/core";
import { Fragment, useEffect } from "react";
import PCNavbar from "./PCNavbar";
import { useState } from "react";
import PhoneNavbar from "./PhoneNavbar";

const Navbar = ({ handleClickOpen, handleSignOpen, studentToken, setStudentToken, studentData, setOpenPassword, setOpenContact }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down(1100)); // Checking the display size


    return (
        // To display the navbar according to the display size
        <Fragment>
            {isMobile ? (
                <PhoneNavbar handleClickOpen={handleClickOpen} handleSignOpen={handleSignOpen} studentToken={studentToken}
                    setStudentToken={setStudentToken} studentData={studentData} setOpenPassword={setOpenPassword} setOpenContact={setOpenContact} />
            ) : (
                <PCNavbar handleClickOpen={handleClickOpen} handleSignOpen={handleSignOpen} studentToken={studentToken}
                    setStudentToken={setStudentToken} studentData={studentData} setOpenPassword={setOpenPassword} setOpenContact={setOpenContact} />
            )}
        </Fragment>
    );
};

export default Navbar;
