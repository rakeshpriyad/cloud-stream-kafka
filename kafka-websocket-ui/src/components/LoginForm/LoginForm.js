import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import userAPI from '../../services/userapi';

 export class LoginForm extends Component {
        constructor(props) {
            super(props)
        
            this.state = {
                userId: '',
                accountNo: '',
                userName: ''
            }
        }

        handleSubmit = event => {
            //alert(`${this.state.userName} ${this.state.userId} ${this.state.accountNo}`)
            let user = {
                id: this.state.userId,
                accountNo: this.state.accountNo,
                userName: this.state.userName
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

    render () {
        const { userId, accountNo, userName } = this.state
    
    return ( <form onSubmit={this.handleSubmit}>
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
				
				<Button type="submit">Submit</Button>
             </form>
    )
}
}
export default LoginForm
