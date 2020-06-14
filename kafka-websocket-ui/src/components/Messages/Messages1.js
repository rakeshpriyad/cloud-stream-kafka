import React from 'react'
import { green } from '@material-ui/core/colors';

const Messages = ({ messages, currentUser }) => {

    let renderMessage = (message) => {
        const { userId, accountNo, username } = message;
        const messageFromMe = currentUser.userId === message.userId;
        const className = messageFromMe ? "Messages-message currentUser" : "Messages-message";
        return (
            <li className={className}>
                <span
                    className="avatar"
                    style={{ backgroundColor: green }}
                />
                <div className="Message-content">
                    <div className="username">
                        {userId}
                    </div>
                    <div className="text">{accountNo}</div>
                </div>
            </li>
        );
    };

    return (
        <ul className="messages-list">
            {messages.map(msg => renderMessage(msg))}
        </ul>
    )
}


export default Messages