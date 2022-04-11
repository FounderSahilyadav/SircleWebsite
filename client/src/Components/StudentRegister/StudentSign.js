import React, { useState } from 'react'
import StudentSignIn from '../../Forms/StudentSignIn';
import StudentSignUp from '../../Forms/StudentSignUp';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';

const StudentSign = ({ open, handleClose, setStudentToken }) => {

    const [signIn, setSignIn] = useState(false);
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
                    <Button style={{ color: "#fff" }} onClick={() => setSignIn(false)}>Sign Up</Button>
                    <Button style={{ color: "#fff" }} onClick={() => setSignIn(true)}>Sign In</Button>
                </DialogTitle>
                {signIn ? (<StudentSignIn handleClose={handleClose} setStudentToken={setStudentToken} />) : (<StudentSignUp handleClose={handleClose} setStudentToken={setStudentToken} />)}
            </Dialog>
        </div>
    )
}

export default StudentSign