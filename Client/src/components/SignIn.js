import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../contexts";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export default function (props) {

    const history = useHistory();
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [open,setOpen] = useState(false);
    const [message, setMessage] = useState({
        severity: "success",
        message: ""
    });
    const {state,dispatch} = useContext(UserContext);

    const handleSubmit = (e) =>{
        e.preventDefault();

        fetch('/sign-in', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                email,
                password
            })
        }).then(res => {
            return res.json();
        }).then(result => {
            console.log(result); 
            if(result.error){
                console.log("Error : ", result.error);
                setOpen(true);
                setMessage({
                    severity: 'error',
                    message: result.error
                });
            }
            else{
                setOpen(true);
                setMessage({
                    severity: 'success',
                    message: result.success
                });
                sessionStorage.setItem('user', result.user);
                dispatch({type: 'User', payload: result.user});
                history.push('/');
            }
        }).catch(err => {
            console.log("Error in signing up : " + err);
        });
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const changeEmail = (e) => {
        setEmail(e.target.value);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
      
        setOpen(false);
    }

    return (
        <div className='form-div-container'>
            <Snackbar 
                anchorOrigin={{horizontal: "center", vertical: "top"}}
                open={open}
                onClose={handleClose}
                autoHideDuration={6000}
            >
                <Alert onClose={handleClose} variant='filled' severity={message.severity} >
                    {message.message}
                </Alert>
                
            </Snackbar>
            <div className='form-container'>
                <form >
                    <h1>Sign In</h1>
                    <TextField required type="email" id="email" label="Your email" value={email} onChange={changeEmail} className='input'/>
                    <TextField required type='password' id="password" label="Your password" value={password} onChange={changePassword} className='input'/>
                    <Button onClick={handleSubmit} variant="contained" color="primary" type='submit' className='submit'>Submit</Button>
                </form>
            </div>
        </div>
    );
}