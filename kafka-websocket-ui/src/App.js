
import React, { Component } from 'react';
import SockJsClient from 'react-stomp';
import './App.css';
//import Input from './components/Input/Input';
//import LoginForm from './components/LoginForm';
//import Messages from './components/Messages/Messages';
import userAPI from './services/userapi';
import { randomColor } from './utils/common';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { green } from '@material-ui/core/colors';

const SOCKET_URL = 'http://localhost:8080/user-app/';
export class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
        userId: '',
        accountNo: '',
        userName: '',
        users : []
    }
}
 //users = []
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

  onConnected = () => {
    console.log("Connected!!")
  }

  onMessageReceived = (user) => {
    console.log('New Message Received!!', user);
    this.setState({
      users: this.state.users.concat(user)
  })
    //this.users.concat(user);
    console.log('users Received!!', this.state.users);
   
  }

  onSendMessage = (msgText) => {
    userAPI.sendMessage(this.state.userId, this.state.accountNo, this.state.userName).then(res => {
      console.log('Sent', res);
    }).catch(err => {
      console.log('Error Occured while sending message to api');
    })
  }

  
render () {
  
  const { userId, accountNo, userName, users } = this.state
  let user = {
    id: this.state.userId,
    accountNo: this.state.accountNo,
    userName: this.state.userName
}
//alert(users);;
  return (
    <div className="App">
      {
        (
          <>
            <SockJsClient
              url={SOCKET_URL}
              topics={['/test/group']}
              onConnect={this.onConnected}
              onDisconnect={console.log("Disconnected!")}
              onMessage={msg => this.onMessageReceived(msg)}
              debug={false}
            />
            
            <ul className="messages-list">
              xxx
            
          {users.map(u => 
              
              
              <li className={u.id} key={u.id}>
              <span
                  className="avatar"
                  style={{ backgroundColor: green }}
              />
              <div className="Message-content">
                  <div className="username">
                      {u.accountNo}
                  </div>
                  <div className="text">{u.accountNo}</div>
              </div>
          </li>
              
              )}

            
        </ul>
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
				
				<Button type="submit">Submit</Button>
             </form>
  
          </>
        ) 
        
      }
    </div>
  )
}
}

export default App;
