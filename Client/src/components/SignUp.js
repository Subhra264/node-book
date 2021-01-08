import { useState } from "react";
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { useHistory } from "react-router-dom";
import Snackbar from '@material-ui/core/Snackbar';
import Alert from '@material-ui/lab/Alert';

export default function (props) {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [open,setOpen] = useState(false);
    const [message, setMessage] = useState({
        severity: "success",
        message: ""
    });
    const history = useHistory();

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(name,email,password);

        fetch('/sign-up', {
            method: 'POST',
            headers:{
                "Content-Type":"application/json"
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        }).then(res => {
            return res.json();
        }).then(result => {
            console.log(result);
            if(result.error){
                console.log('Error : ', result.error);
                setOpen(true);
                setMessage({
                    severity: 'error',
                    message: result.error
                });
            }
            else{
                history.push('/sign-in');
            }
        }).catch(err => {
            console.log("Error in signing up : " + err);
        });
    }

    const changeEmail = (e) => {
        setEmail(e.target.value);
    }

    const changeName = (e) => {
        setName(e.target.value);
    }

    const changePassword = (e) => {
        setPassword(e.target.value);
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
      
        setOpen(false);
    }

    return (
        <div className="form-div-container">
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
            <div className="form-container">
                <form >
                    <h1>Sign Up</h1>
                    <TextField required id="name" label="Your name" value={name} onChange={changeName} className='input'/>
                    <TextField required type="email" id="email" label="Your email" value={email} onChange={changeEmail} className='input'/>
                    <TextField required type='password' id="password" label="Your password" value={password} onChange={changePassword} className='input'/>
                    <Button onClick={handleSubmit} variant="contained" color="primary" type='submit' className='submit'>Submit</Button>
                    {/* <input type='submit' value='SUBMIT' onClick={handleSubmit} /> */}
                </form>
            </div>
        </div>
    );
}