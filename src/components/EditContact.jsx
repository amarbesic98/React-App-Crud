import React, { useState,useEffect } from 'react';
import { FormGroup, FormControl, InputLabel, Input, Button, makeStyles, Typography } from '@material-ui/core';
import { editContact } from '../Service/api';
import { useNavigate } from 'react-router-dom';
import { getContact } from '../Service/api';
import { useParams } from 'react-router-dom';

const initialValue = {
    name: '',
    username: '',
    email: '',
    phone: ''
}

const useStyles = makeStyles({
    container: {
        width: '50%',
        margin: '5% 0 0 25%',
        '& > *': {
            marginTop: 20
        }
    }
})

const EditContact = () => {
    const [contact, setContact] = useState(initialValue);
    const {name, username, email, phone } = contact;
    let navigate = useNavigate();
    const {id} = useParams();
    const classes = useStyles();

    useEffect(()=> {
        loadContact();
    },[])

    const loadContact=async()=> {
        const response = await getContact(id);
        setContact(response.data);
    }

    const onValueChange = (e) => {
        console.log(e.target.value);
        setContact({...contact, [e.target.name]: e.target.value})
    }

    const editContactDetails =  () => {
        editContact(id,contact);
        navigate('/');
    }

    return (
        <FormGroup className={classes.container}>
             <Typography variant="h4">Edit Contact</Typography>
            <FormControl>
                <InputLabel htmlFor="my-input">Name</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='name' value={name} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Username</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='username' value={username} id="my-input" />
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Email</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='email' value={email} id="my-input"/>
            </FormControl>
            <FormControl>
                <InputLabel htmlFor="my-input">Phone</InputLabel>
                <Input onChange={(e) => onValueChange(e)} name='phone' value={phone} id="my-input" />
            </FormControl>
            <FormControl>
                <Button variant="contained" color="primary" onClick={() => editContactDetails()}>edit</Button>
            </FormControl>
        </FormGroup>
    )
}

export default EditContact;
