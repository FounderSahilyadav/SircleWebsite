import React, { Fragment, useEffect, useState } from "react";
import {
    Box,
    Button,
    CircularProgress,
    Container,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@material-ui/core";
import * as FileSaver from "file-saver";
import * as XLSX from "xlsx";
import { getAllStudents } from "../../utils/student";
import { makeStyles } from "@material-ui/styles";
import AdminNav from "./AdminNav";
import { useStateValue } from "../../StateProvider";
import AdminLogin from "./AdminLogin";

const useStyles = makeStyles((theme) => ({
    adminStudents: {
        paddingTop: "72px",
        marginTop: "50px",
        minHeight: "60vh",
    },
    studentList: {
        marginTop: "50px",
        marginBottom: "50px",
    },
    tableBody: {
        maxHeight: "100vh",
        overflow: "auto",
    },
}));

const AdminStudents = () => {
    const classes = useStyles();
    const [students, setStudents] = useState([]);
    const [studentsLoader, setStudentsLoader] = useState(true);

    const [{ admin }] = useStateValue();

    const fileName = "Students";
    const fileType =
        "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    const exportToCSV = () => {
        const ws = XLSX.utils.json_to_sheet(students);
        const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
        const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
        const data = new Blob([excelBuffer], { type: fileType });
        FileSaver.saveAs(data, fileName + fileExtension);
    };

    useEffect(() => {
        setStudentsLoader(true);
        getAllStudents().then((res) => setStudents(res));
        setStudentsLoader(false);
    }, []);
    return admin ? (
        <Fragment>
            <AdminNav />
            <Box className={classes.adminStudents}>
                <Container>
                    <Box>
                        <Typography variant="h4">
                            Registered Students
                        </Typography>
                    </Box>
                    {studentsLoader ? (
                        <Box>
                            <CircularProgress />
                        </Box>
                    ) : (
                        <Box>
                            <Button
                                onClick={exportToCSV}
                                style={{ marginTop: "15px" }}
                                variant="contained"
                                color="primary"
                                width="100%"
                            >
                                Export To Excel File
                            </Button>
                            <Box className={classes.studentList}>
                                <TableContainer>
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>Name</TableCell>
                                                <TableCell align="right">
                                                    Phone
                                                </TableCell>
                                                <TableCell align="right">
                                                    Email
                                                </TableCell>
                                                <TableCell align="right">
                                                    Institute
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody
                                            className={classes.tableBody}
                                        >
                                            {(students.length < 3000
                                                ? students
                                                : students.slice(0, 3000)
                                            ).map((student) => (
                                                <TableRow key={student.id}>
                                                    <TableCell
                                                        component="th"
                                                        scope="row"
                                                    >
                                                        {student.name}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {student.phone}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {student.email}
                                                    </TableCell>
                                                    <TableCell align="right">
                                                        {student.institute}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                {students.length > 3000 ? (
                                    <Typography variant="body2">
                                        *All student registrations are not shown
                                        here, export to excel file to see all
                                        student registrations
                                    </Typography>
                                ) : (
                                    <></>
                                )}
                            </Box>
                        </Box>
                    )}
                </Container>
            </Box>
        </Fragment>
    ) : (
        <AdminLogin />
    );
};

export default AdminStudents;
