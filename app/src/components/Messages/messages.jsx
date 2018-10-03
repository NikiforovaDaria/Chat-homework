import React, { Component } from 'react';
import avatar from "../../images/avatar.png";
import classNames from "classnames";
import _ from "lodash";
import Sender from '../SenderMessage/sender'


export default class  Messages extends Component {
        constructor(props){
        super(props);

        this.state ={
            newMessage: 'Hello there!!!',
        }

        this.addTestMessages = this.addTestMessages.bind(this);
        this.renderMessage = this.renderMessage.bind(this)
    }

    renderMessage(message){
        const text = message.body;1
        _.split(text, '\n')
        return <p dangerouslySetInnerHTML={{__html: _.get(message, 'body')}}></p>
    }

    addTestMessages() {
        let {store} = this.props;

        for (let i = 0; i < 20; i++) {
            let isMe = false;
            if (i % 2 === 0) {
                isMe = true;
            }
            const newMsg = {
                _id: `${i}`,
                author: `Author ${i}`,
                body: `The body of message ${i}`,
                avatar: avatar,
                me: isMe,
            }

            store.addMessage(i, newMsg);
        }
    }    

    componentDidMount(){
        this.addTestMessages()
    }

    render() {
        const {store} = this.props;
        const activeChannel = store.getActiveChannel();
        const messages = store.getMessagesFromChannel(activeChannel); //store.getMessages();
    
        return (
            <div className='content'>
                <div className='messages'>
                    {messages.map((message, index) => {
                        return (
                            <div key={index} className={classNames('message', { 'me': message.me })}>
                                <div className='message-user-image'>
                                    <img src={message.avatar} alt='' />
                                </div>
                                <div className='message-body'>
                                    <div className='message-author'>
                                        {message.me ? 'You ' : message.author} says:
                                    </div>
                                    <div className='message-text'>
                                        {this.renderMessage(message)}
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