import { Button, Dialog, DialogActions, DialogContent, DialogTitle, makeStyles, Typography } from '@material-ui/core'
const useStyles = makeStyles((theme) => ({
    emailSection: {
        fontSize: '25px',
        color: '#18A9E2',
        marginTop: '5px',
        [theme.breakpoints.down('sm')]: {
            fontSize: '15px',
        },
    },
    textSize: {
        [theme.breakpoints.down('sm')]: {
            fontSize: '13px',
        }
    }

}));

const ContactUsPopup = (props) => {
    const classes = useStyles();
    const { open, handleClose } = props;
    return (
        <Dialog open={open} onClose={handleClose}>

            <DialogTitle>Contact Us</DialogTitle>
            <DialogContent>
                <Typography variant="body1" component={"p"}>
                    Need to get in touch with us? Either fill out
                    the form with your inquiry or find the email
                    you'd like to contact below.
                </Typography>
                <br />
                <Typography component={"p"} variant="body1" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

                    <a href="mailto:Hello@sircle.in">
                        <span className={classes.emailSection}>&#9993;</span> <b className={classes.textSize}>Hello@sircle.in</b>
                    </a>

                    <a href="tel:+919817134356"><span className={classes.emailSection}>&#9742;</span> <b className={classes.textSize}>+91 98 17 134 356</b></a>

                </Typography>



            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Close</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ContactUsPopup