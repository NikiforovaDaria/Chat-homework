import React, { Component } from 'react';
import classNames from "classnames";
import _ from "lodash";
import Sender from '../SenderMessage/sender'
import ReactMarkdown from 'react-markdown'


export default class  Messages extends Component {
        constructor(props){
        super(props);

        this.state ={
            newMessage: 'Hello there!!!',
        }

        this.scrollMessagesToBottom = this.scrollMessagesToBottom.bind(this);
    }

    scrollMessagesToBottom() {
        if(this.messagesRef) {
            this.messagesRef.scrollTop = this.messagesRef.scrollHeight;
        }
    }

    componentDidUpdate() {
        this.scrollMessagesToBottom();
    }

    render() {
        const {store} = this.props;
        const activeChannel = store.getActiveChannel();
        const messages = store.getMessagesFromChannel(activeChannel); 
    
        return (
            <div className='content'>
                <div className='messages' ref={(ref) => this.messagesRef = ref}>
                    {messages.map((message, index) => {
                        const user = _.get(message, 'user');
                        return (
                            <div key={index} className={classNames('message', { 'me': message.me })}>
                                <div className='message-user-image'>
                                    <img src={_.get(user, 'avatar')} alt='' />
                                </div>
                                <div className='message-body'>
                                    <div className='message-author'>
                                        {message.me ? 'You ' : _.get(message, 'user.name')} says:
                                    </div>
                                    <div className='message-text'>
                                        <ReactMarkdown source={(message.body).replace(/\n/g, '\n\n')}/>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                <Sender store={store}/>
            </div>    
        );
    }
}