import React, { Component } from 'react';

import { green } from '@material-ui/core/colors';
import { render } from '@testing-library/react';
export class Messages extends Component {
    
 //Messages = ({ messages, currentUser }) => {
    constructor(props) {
        super(props)
    
        
    }

    

    render() {
       // const { userId, accountNo, userName } = this.state
    return (
        <ul className="messages-list">
            {this.props.messages.map(user => 
                <li className={user.userName}>
                <span
                    className="avatar"
                    style={{ backgroundColor: green }}
                />
                <div className="Message-content">
                    <div className="username">
                        {user.userId}
                    </div>
                    <div className="text">{user.accountNo}</div>
                </div>
            </li>
                )}
        </ul>
    )
  }
}


export default Messages;