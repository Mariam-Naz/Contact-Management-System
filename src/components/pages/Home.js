import React, { useState, useEffect } from "react";
import fireDb from "../../firebase";
import { withStyles, makeStyles, useTheme} from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import TablePagination from '@material-ui/core/TablePagination';
import IconButton from '@material-ui/core/IconButton';
import FirstPageIcon from '@material-ui/icons/FirstPage';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import KeyboardArrowRight from '@material-ui/icons/KeyboardArrowRight';
import LastPageIcon from '@material-ui/icons/LastPage';
import TableFooter from '@material-ui/core/TableFooter';
import PropTypes from 'prop-types';
import { Delete, Edit, Visibility} from '@material-ui/icons';
import { green } from '@material-ui/core/colors';
import {Link} from "react-router-dom";
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { TextField, Button } from "@material-ui/core";
import {isEmpty} from 'lodash'

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

// pagination
const useStyles1 = makeStyles((theme) => ({
    root: {
        flexShrink: 0,
        marginLeft: theme.spacing(2.5),
    },
}));

function TablePaginationActions(props) {
    const classes = useStyles1();
    const theme = useTheme();
    const { count, page, rowsPerPage, onChangePage } = props;
    

    const handleFirstPageButtonClick = (event) => {
        onChangePage(event, 0);
    };

    const handleBackButtonClick = (event) => {
        onChangePage(event, page - 1);
    };

    const handleNextButtonClick = (event) => {
        onChangePage(event, page + 1);
    };

    const handleLastPageButtonClick = (event) => {
        onChangePage(event, Math.max(0, Math.ceil(count / rowsPerPage) - 1));
    };

    return (
        <div className={classes.root}>
            <IconButton
                onClick={handleFirstPageButtonClick}
                disabled={page === 0}
                aria-label="first page"
            >
                {theme.direction === 'rtl' ? <LastPageIcon /> : <FirstPageIcon />}
            </IconButton>
            <IconButton onClick={handleBackButtonClick} disabled={page === 0} aria-label="previous page">
                {theme.direction === 'rtl' ? <KeyboardArrowRight /> : <KeyboardArrowLeft />}
            </IconButton>
            <IconButton
                onClick={handleNextButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="next page"
            >
                {theme.direction === 'rtl' ? <KeyboardArrowLeft /> : <KeyboardArrowRight />}
            </IconButton>
            <IconButton
                onClick={handleLastPageButtonClick}
                disabled={page >= Math.ceil(count / rowsPerPage) - 1}
                aria-label="last page"
            >
                {theme.direction === 'rtl' ? <FirstPageIcon /> : <LastPageIcon />}
            </IconButton>
        </div>
    );
}

TablePaginationActions.propTypes = {
    count: PropTypes.number.isRequired,
    onChangePage: PropTypes.func.isRequired,
    page: PropTypes.number.isRequired,
    rowsPerPage: PropTypes.number.isRequired,
};

//styleing edit button
const GreenIconButton = withStyles((theme) => ({
    root: {
        color: green[700],
    },
}))(IconButton);

//styling Modal
const useStylesModal = makeStyles((theme) => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));

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

    //pagination
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(5);

    const emptyRows = rowsPerPage - Math.min(rowsPerPage, Object.keys(contacts).length - page * rowsPerPage);

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const onDelete = (id)=>{
        if(window.confirm('are you sure?')){
            fireDb.child(`contacts/${id}`).remove((err)=>{
                if(err){
                    console.log(err);
                }
            })
        }
    }

    //Modal
    const values = {
        name: "",
        mobile: "",
        email: "",
        address: "",
    };
    const [initialState, setState] = useState(values);
    
    const classes1 = useStylesModal();
    const [open, setOpen] = React.useState(false);

    const handleOpen = (id) => {
        setOpen(true);
        if (isEmpty(id)) {
            setState({ ...values })
        } else {
            setState({ ...contacts[id] })
        }
    };

    const handleClose = () => {
        setOpen(false);
    };
    return (
        <div className='container'>
            <div>
                <Modal
                    aria-labelledby="transition-modal-title"
                    aria-describedby="transition-modal-description"
                    className={classes1.modal}
                    open={open}
                    onClose={handleClose}
                    closeAfterTransition
                    BackdropComponent={Backdrop}
                    BackdropProps={{
                        timeout: 500,
                    }}
                >
                    <Fade in={open}>
                        <div className={classes1.paper}>
                            <form style={{ textAlign: 'center' }}>
                                <TextField
                                    label="Name"
                                    style={{ margin: 8 }}
                                    fullWidth
                                    margin="normal"
                                    type='text' name='name' value={initialState.name}
                                />
                                <TextField
                                    label="Mobile"
                                    style={{ margin: 8 }}
                                    fullWidth
                                    margin="normal"
                                    type='phone' name='mobile' value={initialState.mobile}
                                />
                                <TextField
                                    label="Email"
                                    style={{ margin: 8 }}
                                    fullWidth
                                    margin="normal"
                                    type='email' name='email' value={initialState.email}
                                />
                                <TextField
                                    label="Address"
                                    style={{ margin: 8 }}
                                    fullWidth
                                    margin="normal"
                                    type='text' name='address' value={initialState.address}
                                />
                            </form>
                        </div>
                    </Fade>
                </Modal>
            </div>
            <div className='py-4'>
                <TableContainer component={Paper}>
                    <Table className={classes.table} aria-label="Display Contacts">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>No.</StyledTableCell>
                                <StyledTableCell>Name</StyledTableCell>
                                <StyledTableCell>Mobile</StyledTableCell>
                                <StyledTableCell>Email</StyledTableCell>
                                <StyledTableCell>Address</StyledTableCell>
                                <StyledTableCell>Action</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {(rowsPerPage > 0
                                ? Object.keys(contacts).slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                : Object.keys(contacts)
                            ).map((id , index) => (
                                <StyledTableRow key={id}>
                                    <StyledTableCell component="th" scope="row">
                                        {index+1}
                                    </StyledTableCell>
                                    <StyledTableCell>{contacts[id].name}</StyledTableCell>
                                    <StyledTableCell>{contacts[id].mobile}</StyledTableCell>
                                    <StyledTableCell>{contacts[id].email}</StyledTableCell>
                                    <StyledTableCell>{contacts[id].address}</StyledTableCell>
                                    <StyledTableCell><GreenIconButton component={Link} to={`/update/${id}`} ><Edit /></GreenIconButton>  <IconButton aria-label="show" color="primary" onClick={()=> handleOpen(id)}><Visibility /></IconButton> <IconButton aria-label="delete" color='secondary' onClick={() => onDelete(id)}>
                                        <Delete />
                                    </IconButton></StyledTableCell>
                                </StyledTableRow>
                            ))}
                            {emptyRows > 0 && (
                                <TableRow style={{ height: 53 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                            )}
                        </TableBody>
                        <TableFooter>
                        <TableRow>
                            <TablePagination
                                rowsPerPageOptions={[5, 10, 25, { label: 'All', value: -1 }]}
                                colSpan={3}
                                    count={Object.keys(contacts).length}
                                rowsPerPage={rowsPerPage}
                                page={page}
                                SelectProps={{
                                    inputProps: { 'aria-label': 'rows per page' },
                                    native: true,
                                }}
                                onChangePage={handleChangePage}
                                onChangeRowsPerPage={handleChangeRowsPerPage}
                                ActionsComponent={TablePaginationActions}
                            />
                        </TableRow>
                            </TableFooter>
                    </Table>
                </TableContainer>
            </div>
        </div>
    );
};

export default Home;