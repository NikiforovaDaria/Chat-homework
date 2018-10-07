import React, { Component } from 'react';
import avatar from "../../images/avatar.png";
import { OrderedMap } from "immutable";
import classNames from "classnames";
import _ from "lodash";


class LeftSideBar extends Component {
    constructor(props) {
        super(props);
        this.renderChannelAvatars = this.renderChannelAvatars.bind(this);
    }

    renderChannelAvatars(channel) {
        const { store } = this.props;
        const members = store.getMembersFromChannel(channel);
        const maxDisplay = 4;
        const total = members.size > maxDisplay ? maxDisplay : members.size;
        const avatars = members.map((user, index) => {
            return index < maxDisplay ? <img key={index} src={_.get(user, 'avatar')} alt={_.get(user, 'name')}/> : null;
        });
        return <div className={classNames('channel-avatars', `channel-avatars-${total}`)}>{avatars}</div>
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
                            <div 
                            key={channel._id} 
                            className={classNames('channel', {'notify': _.get(channel, 'notify') === true}, 
                            {'active': _.get(activeChannel, '_id') === _.get(channel, '_id', null)})}
                            onClick={(key)=> {
                                store.setActiveChannelId(channel._id)
                            }} >
                                <div className='user-image'>
                                    {this.renderChannelAvatars(channel)}
                                </div>
                                <div className='channel-info'>
                                    {store.renderChannelTitle(channel)}
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
