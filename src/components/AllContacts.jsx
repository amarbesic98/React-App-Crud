import { deleteContact, getContact } from "../Service/api";
import { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import { TableCell, TableHead,Table,TableBody, TableRow,Button,TableContainer,Paper,TablePagination,makeStyles } from '@material-ui/core';

const useStyle = makeStyles({
    table : {
        width : '90%',
        margin : '10px 0 0 50px'
    },
    thead: {
        '& > *': {
            fontSize: 20,
            background: '#000000',
            color: '#FFFFFF',
            width :'5%'
        }
    },
    row: {
        '& > *': {
            fontSize: 18
        }
    }
})

const AllContacts = ()=> {
    const [contact,setContact] = useState([]);
    const [page,setPage] = useState(0);
    const [search,setSearch] = useState('');
    const[redoviPoStranici,setRedoviPoStranici] =useState(5);
    const classes = useStyle();

    useEffect(()=> {
        loadContact();
    },[])


    const loadContact = async ()=> {
        const response = await getContact();
        setContact(response.data);
    }

    const deleteDetails= async (id)=>{
        await deleteContact(id);
        loadContact();

    }
    const handleChangePage=(e,novStranica) =>{
        setPage(novStranica);
    }

    const handleChangeRedoviPoStranici = e=> {
        setRedoviPoStranici(parseInt(e.target.value,10));
        setPage(0);
    }

    const prazanRed = redoviPoStranici-Math.min(redoviPoStranici, contact.length-page * redoviPoStranici);
    return (
        <>
        <div className="search">
        <input className="input" style = {{borderRadius:'5px'}} type ="text" 
        placeholder="Search.."
        onChange={(e) =>{ setSearch(e.target.value)}}
        />
    </div>

        <TableContainer component={Paper}>
        <Table className={classes.table}>
            <TableHead>
                <TableRow className={classes.thead}>
                    <TableCell>ID</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell>UserName</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Phone</TableCell>
                    <TableCell>Action</TableCell>

                </TableRow>
            </TableHead>

            <TableBody>
                {contact
                .filter((c)=> {
                    if(search === ""){
                        return c;
                    } else if(c.name.toLowerCase().includes(search.toLowerCase())) {
                        return c;
                    }

                })
                .slice(page * redoviPoStranici,page * redoviPoStranici+redoviPoStranici)
                .map((c)=> {
                    return (
                        <TableRow key ={c.id}>
                            <TableCell>{c.id}</TableCell>
                            <TableCell>{c.name}</TableCell>
                            <TableCell>{c.username}</TableCell>
                            <TableCell>{c.email}</TableCell>
                            <TableCell>{c.phone}</TableCell>

                            <TableCell>
                        
                        <Button color="primary" variant="contained" style={{marginRight:10}} component={Link} to={`/edit/${c.id}`}>Edit</Button>
                        
                        <Button color="secondary" variant="contained" onClick={() => deleteDetails(c.id)}>Delete</Button> 
                    </TableCell>
                        </TableRow>
                    )

                })}

                {prazanRed > 0  &&  (
                    <TableRow style={{ height: 53 * prazanRed }}>
                    <TableCell colSpan={6} />
                  </TableRow>

                )}

            </TableBody>
        </Table>
        <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={contact.length}
        rowsPerPage={redoviPoStranici}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRedoviPoStranici}
      />
        </TableContainer>

        </>
    )
}

export default AllContacts;