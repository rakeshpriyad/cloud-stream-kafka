import React, { useState } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const LoginForm = ({ onSubmit }) => {

    const [userid,username, setUsername,setUserId] = useState("");
    let handleUserNameChange = event => setUsername(event.target.value);
    let handleUserIdChange = event => setUserId(event.target.value);

    let handleSubmit = () => {
        onSubmit(username);
    }

    return (
        <div>
             <TextField
                label="Type user id"
                placeholder="UserId"
                onChange={handleUserIdChange}
                margin="normal"
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                        handleSubmit();
                    }
                }}
            />
            <TextField
                label="Type your username"
                placeholder="Username"
                onChange={handleUserNameChange}
                margin="normal"
                onKeyPress={event => {
                    if (event.key === 'Enter') {
                        handleSubmit();
                    }
                }}
            />
            <br />
            <Button variant="contained" color="primary" onClick={handleSubmit} >
                Login
             </Button>

        </div>
    )
}

export default LoginForm
