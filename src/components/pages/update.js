import React, { useState, useEffect }from "react";
import fireDb from "../../firebase";
import { useHistory, useParams} from "react-router-dom";
import { TextField, Button } from "@material-ui/core";
import { createMuiTheme, withStyles, makeStyles, ThemeProvider } from '@material-ui/core/styles';
import SaveIcon from '@material-ui/icons/Save';
import {isEmpty} from 'lodash'

const SaveButton = withStyles({
    root: {
        boxShadow: 'none',
        textTransform: 'none',
        fontSize: 16,
        padding: '6px 12px',
        border: '1px solid',
        lineHeight: 1.5,
        backgroundColor: '#0063cc',
        borderColor: '#0063cc',
        fontFamily: [
            '-apple-system',
            'BlinkMacSystemFont',
            '"Segoe UI"',
            'Roboto',
            '"Helvetica Neue"',
            'Arial',
            'sans-serif',
            '"Apple Color Emoji"',
            '"Segoe UI Emoji"',
            '"Segoe UI Symbol"',
        ].join(','),
        '&:hover': {
            backgroundColor: '#0069d9',
            borderColor: '#0062cc',
            boxShadow: 'none',
        },
        '&:active': {
            boxShadow: 'none',
            backgroundColor: '#0062cc',
            borderColor: '#005cbf',
        },
        '&:focus': {
            boxShadow: '0 0 0 0.2rem rgba(0,123,255,.5)',
        },
    },
})(Button);

const useStyles = makeStyles((theme) => ({
    margin: {
        margin: theme.spacing(1),
    },
}));

const Update = () =>{
    const classes = useStyles();
    const [contacts, setContacts] = useState({});
    let currentId = useParams();
    const {id} = currentId;
    useEffect(() => {
        fetchContacts();
    }, [id])
    console.log('current id:' , currentId);
    console.log('ID: ', id);
    const fetchContacts = async () => {
        fireDb.child('contacts').on("value", (snapshot) => {
            if (snapshot.val() !== null) {
                setContacts({
                    ...snapshot.val(),
                })
            } else {
                snapshot({});
            }
        })
    }

    const values = {
        name: "",
        mobile: "",
        email: "",
        address: "",
    };
    const [initialState, setState] = useState(values);
    const history = useHistory();
    const handleChange = (e) => {
        let { name, value } = e.target;
        setState({
            ...initialState,
            [name]: value,
        })
    }
    
    useEffect(()=>{
        if(isEmpty(id)){
            setState({...values})
        }else{
            setState({...contacts[id]})
        }
    },[id, contacts])

    const handleSubmit = () => {
        if(isEmpty(id)){
        fireDb.child('contacts').push(initialState, (err) => {
            if (err) {
                console.log(err)
            }
        });
    }else{
        fireDb.child(`contacts/${id}`).set(initialState, (err) => {
            if (err) {
                console.log(err)
            }
        });
    }
        history.push('/')
    }

    return(
        <div className='container mt-5'>
            <div className='row'>
                <div className='col-md-6 mx-auto'>
                    <h1 className='text-center'>Insert Form</h1>
                    <form onSubmit={handleSubmit} style={{ textAlign: 'center' }}>
                        <TextField
                            label="Name"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                            type='text' name='name' value={initialState.name} onChange={handleChange}
                        />
                        <TextField
                            label="Mobile"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                            type='phone' name='mobile' value={initialState.mobile} onChange={handleChange}
                        />
                        <TextField
                            label="Email"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                            type='email' name='email' value={initialState.email} onChange={handleChange}
                        />
                        <TextField
                            label="Address"
                            style={{ margin: 8 }}
                            fullWidth
                            margin="normal"
                            type='text' name='address' value={initialState.address} onChange={handleChange}
                        />
                        <Button variant="outlined">
                            Cancel
                        </Button>
                        <SaveButton
                            type="submit"
                            variant="contained"
                            color="primary"
                            size="small"
                            className={classes.margin}
                            startIcon={<SaveIcon />}
                        >
                            Save
                        </SaveButton>

                    </form>
                </div>
            </div>
        </div>
    );
}

export default Update;