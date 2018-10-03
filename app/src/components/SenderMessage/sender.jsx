import React, { Component } from 'react';
import { ObjectID } from '../../Helpers/objectid';
import avatar from "../../images/avatar.png";
import _ from "lodash";

export default class Sender extends Component {
    constructor(props){
        super(props);

        this.state ={
            newMessage: 'Hello there...',
        }
        this.handleSend = this.handleSend.bind(this);
    }

    handleSend(){
        const {store} = this.props;
        const {newMessage} = this.state;
        const messageId = new ObjectID().toString();
        const channel = store.getActiveChannel();
        const channelId = _.get(channel, '_id', null);
        const currentUser = store.getCurrentUser();

        const message = {
            _id: messageId,
            channelId: channelId,
            body: newMessage,
            author: _.get(currentUser, 'name', null),
            avatar: avatar, 
            me: true,
        }
        store.addMessage(messageId, message);

        this.setState({
            newMessage: ''
        })
    }

    render() {
        return (
            <div className='messenger-input'>
                <div className='text-input'>
                    <textarea onKeyUp={(event)=>{
                        if(event.key  === 'Enter' && !event.shiftKey){
                            this,this.handleSend()
                        }
                    }} onChange={(event)=>{
                        this.setState({newMessage: _.get(event, 'target.value')})
                    }} value={this.state.newMessage}placeholder='Write your message...' />
                </div>
                <div className='actions'>
                    <button onClick={this.handleSend} className='send'>Send</button>
                </div>
            </div> 
        );
    }
}

