import React from "react";
import fireDb from "../../firebase";
import { useState, useEffect } from 'react';
import { withStyles, makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

// styling of table
const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
    root: {
        '&:nth-of-type(odd)': {
            backgroundColor: theme.palette.action.hover,
        },
    },
}))(TableRow);


const useStyles = makeStyles({
    table: {
        minWidth: 700,
    },
});
const Home = () =>{
    const classes = useStyles();

// feching data from firebase
    const [contacts, setContacts] = useState({});

    useEffect(() => {
        fetchContacts();
    }, [])

    const fetchContacts = async () => {
        fireDb.child('contacts').on("value" , (snapshot)=>{
            if(snapshot.val() !== null){
                setContacts({
                    ...snapshot.val(),
                })
            }else{
                snapshot({});
            }
        })
    }


    return (
        <div className='container'>
            <div className='py-4'>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="Display Contacts">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No.</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell align="right">Mobile</StyledTableCell>
                                <StyledTableCell align="right">Email</StyledTableCell>
                                <StyledTableCell align="right">Address</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Object.keys(contacts).map((id , index) => (
                                <StyledTableRow key={id}>
                                    <StyledTableCell component="th" scope="row">
                                        {index + 1}
                                    </StyledTableCell>
                                    <StyledTableCell>{contacts[id].name}</StyledTableCell>
                                    <StyledTableCell align="right">{contacts[id].mobile}</StyledTableCell>
                                    <StyledTableCell align="right">{contacts[id].email}</StyledTableCell>
                                    <StyledTableCell align="right">{contacts[id].address}</StyledTableCell>
                                </StyledTableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default Home;