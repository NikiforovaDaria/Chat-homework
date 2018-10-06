import React, { Component } from 'react';
import { ObjectID } from '../../Helpers/objectid';
import avatar from "../../images/avatar.png";
import _ from "lodash";
import 'emoji-mart/css/emoji-mart.css'
import { Picker } from 'emoji-mart'

export default class Sender extends Component {
    constructor(props){
        super(props);

        this.state ={
            newMessage: 'Hello there...',
            showEmoji: false
        }
        this.handleSend = this.handleSend.bind(this);
        
    }

    handleSend(){
        
        const {store} = this.props;
        let {newMessage} = this.state;
        if(_.trim(newMessage).length) {
            const messageId = new ObjectID().toString();
            const channel = store.getActiveChannel();
            const channelId = _.get(channel, '_id', null);
            const currentUser = store.getCurrentUser();
            if (newMessage.length > 0) {
                const message = {
                    _id: messageId,
                    channelId: channelId,
                    body: newMessage,
                    userId: _.get(currentUser, '_id'),
                    me: true,
                }
                store.addMessage(messageId, message);

                this.setState({
                    newMessage: ''
                })
            }
        }
        if(this.state.showEmoji) {
            this.showhideEmoji();
        }
    }
    
    addEmoji = (e) => {
        let emojiPic = String.fromCodePoint(`0x${e.unified}`);
        this.setState({
            newMessage: this.state.newMessage + emojiPic
        });
    }

    showhideEmoji = () => {
        this.setState({ 
            showEmoji: !this.state.showEmoji 
        });
    }

    render() {
        const { store } = this.props;
        const members = store.getMembersFromChannel(activeChannel);
        const activeChannel = store.getActiveChannel();
        return (
            <div>
            { activeChannel //&& members.size > 0 
            ? 
                <div className='messenger-input'>
                    <div className='text-input'>
                        <textarea onKeyUp={(event)=>{
                            if(event.key  === 'Enter' && !event.shiftKey){
                                this.handleSend();
                            }
                        }} onChange={(event)=>{
                            this.setState({newMessage: _.get(event, 'target.value')})
                        }} 
                        value={this.state.newMessage} 
                        placeholder='Write your message...' />
                    </div>
                    <div className='actions'>
                        <button onClick={this.showhideEmoji} className='send'>Emoji</button>
                    </div>
                    <div className='actions'>
                        <button onClick={this.handleSend} className='send'>Send</button>
                    </div>
                    { this.state.showEmoji ? <Picker onSelect={this.addEmoji} style={{ position: 'absolute', bottom: '70px', right: '300px'}}/> : null }
                </div> 
                : null }
                </div>
        );
    }
}

