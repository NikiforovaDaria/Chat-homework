import React, { Component } from 'react';
import avatar from "../../images/avatar.png";
import { OrderedMap } from "immutable";
import classNames from "classnames";
import _ from "lodash";


class LeftSideBar extends Component {
    constructor(props) {
        super(props);
        this.addTestMessages = this.addTestMessages.bind(this);
    }
    addTestMessages() {
        const {store} =  this.props;
        for (let c=0; c < 10; c++){
            let newChannel ={
                _id: `${c}`,
                title: `Channel title ${c}`,
                lastMessage: `Hey there...${c}`,
                members: new OrderedMap({
                    '2': true,
                    '3': true,
                    '1': true
                }),
                messages: new OrderedMap(),
            }
            const msgId = `${c}`
            newChannel.messages = newChannel.messages.set(msgId, true)

            store.addChannel(c, newChannel)
        }
    }
    componentDidMount() {
        this.addTestMessages()
    }
    
    render() {
        const { store } = this.props;
        const channels = store.getChannels();
        const activeChannel = store.getActiveChannel();
        return (
            <div className='sidebar-left'>
                <div className='channels'>
                    {channels.map((channel, key) => {
                        return (
                            <div onClick={(key)=>   {
                                store.setActiveChannelId(channel._id)
                            }} 
                            key={channel._id} className={classNames('channel', {'active': _.get(activeChannel, '_id') === _.get(channel, '_id', null)})}>
                                <div className='user-image'>
                                    <img src={avatar} alt='' />
                                </div>
                                <div className='channel-info'>
                                    <h2>{channel.title}</h2>
                                    <p>{channel.lastMessage}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}

export default LeftSideBar;
