import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, makeStyles } from '@material-ui/core';
const useStyle =  makeStyles({
    header : {
        background : '#111111'
    },
    tabs : {
        color:'#FFFFFF',
        textDecoration : 'none',
        marginRight : 20,
        fontSize : 20
    }

})
const NavBar = () => {
    const classes = useStyle();
    return (
        <AppBar className={classes.header} position ="static">
        <Toolbar>
            
            <NavLink className ={classes.tabs} to ="/add">Add Contact</NavLink>
            <NavLink  className ={classes.tabs} to ="/">All Contacts</NavLink>

        </Toolbar>
    </AppBar>
        
    )
}

export default NavBar;