import React, { Component } from 'react';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import userAPI from '../../services/userapi';

export class Input extends Component {
    
       constructor(props) {
           super(props)
       
           
       }

    handleSubmit = event => {
        alert(`${this.props.onSendMessage.userId} `)
        let user = {
            id: this.props.onSendMessage.userId,
            accountNo: this.props.onSendMessage.accountNo,
            userName: this.props.onSendMessage.userName
        }
      userAPI.sendMessage(user).then(res => {
        console.log('Sent', res);
      }).catch(err => {
        console.log('Error Occured while sending message to api');
      })
        event.preventDefault()
    }

    handleUsernameChange = event => {
        this.setState({
            userName: event.target.value
        })
    }

    handleUserIdChange = event => {
        this.setState({
            userId: event.target.value
        })
    }

    handleAccountChange = event => {
        this.setState({
            accountNo: event.target.value
        })
    }

    render() {
        const { userId, accountNo, userName } = this.props.onSendMessage
    return (
        <form onSubmit={this.handleSubmit}>
            <TextField
                label="Type User id"
                placeholder="UserId"
                onChange={this.handleUserIdChange}
                margin="normal"
                value ={userId}
            />
            <TextField
                        label="Type User Name"
                        placeholder="UserId"
                        margin="normal"
						value={userName}
						onChange={this.handleUsernameChange}
					/>
				
                <TextField
                        label="Type Account No"
                        placeholder="Account No"
                        margin="normal"
						value={accountNo}
						onChange={this.handleAccountChange}
					/>
				
				<Button variant="contained" color="primary" type="submit">
                Send
            </Button>
             </form>

            
       
    );
}

}
export default Input
