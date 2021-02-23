import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../contexts";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import HomeIcon from '@material-ui/icons/Home';
import { makeStyles } from "@material-ui/core";
import AddIcon from '@material-ui/icons/Add';

const useStyles = makeStyles((theme) => ({
    typoGraphy: {
        flexGrow: 1
    }
}));

function Navbar(props) {
    const { state } = useContext(UserContext);
    const classes = useStyles();
    let key = 0;
    const links = () => {
        if (state) {
            return [
                <Link to='/myfeed' key='myfeed'>MyFeed</Link>,
                // <Link to='/new-post' key='newpost'>
                //     <AddIcon />
                // </Link>
                <IconButton edge="start" color="inherit" aria-label="menu"  component={Link} to='/new-post'>
                    <AddIcon />
                </IconButton>
            ];
        }

        return [
            <Link to='/sign-in' key='signin'> Sign in</Link>,
            <Link to='/sign-up' key='signup'> Sign up</Link>
        ];

    }
    return (
        <div>
            <AppBar >
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu" className='home-icon' component={Link} to='/'>
                        <HomeIcon />
                    </IconButton>
                    <Typography className={classes.typoGraphy}></Typography>
                    {
                        links().map(elem => {
                            key++;
                            return <Button color="inherit" style={{fontSize: '1.1rem'}} key={key}>{elem}</Button>
                        })
                    }
                    
                </Toolbar>
            </AppBar>
            
        </div>
    );
}

export default Navbar;