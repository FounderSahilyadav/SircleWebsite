import React, { useState } from 'react';
import StudentSignIn from '../../Forms/StudentSignIn';
import StudentSignUp from '../../Forms/StudentSignUp';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

const StudentSign = ({ open, handleClose, setStudentToken, studentToken }) => {

    const [signIn, setSignIn] = useState(true);
    return (
        <div>
            <Dialog
                open={open} // Passes as a prop to the component from app.js
                onClose={handleClose} // // Passes as a prop to the component from app.js
                aria-labelledby="form-dialog-title"
            >
                <DialogTitle
                    id="form-dialog-title"
                    style={{ background: "#1A2E39" }}
                >
                    <Button style={{ color: signIn ? "orange" : "#fff", fontSize: signIn ? '20px' : "15px" }} onClick={() => setSignIn(true)}>Sign In</Button>
                    <Button style={{ color: signIn ? "#fff" : "orange", fontSize: signIn ? '15px' : "20px", marginLeft: '20px' }} onClick={() => setSignIn(false)}>Sign Up</Button>
                </DialogTitle>
                {signIn ? (<StudentSignIn handleClose={handleClose} setStudentToken={setStudentToken} studentToken={studentToken} />) : (<StudentSignUp handleClose={handleClose} setStudentToken={setStudentToken} />)}
            </Dialog>
        </div>
    )
}

export default StudentSign