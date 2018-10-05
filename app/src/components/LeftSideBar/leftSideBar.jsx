import React, { Component } from 'react';
import avatar from "../../images/avatar.png";
import { OrderedMap } from "immutable";
import classNames from "classnames";
import _ from "lodash";


class LeftSideBar extends Component {
    constructor(props) {
        super(props);
        this.renderChannelTitle = this.renderChannelTitle.bind(this);
    }

    renderChannelTitle(channel = {}) {
        const {store} = this.props;
        const members = store.getMembersFromChannel(channel);
        const names = [];
        members.forEach((user) => {
            const name = _.get(user, 'name');
            names.push(name);
        })
        return <h2>{_.join(names, ', ')}</h2>

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
                                    {this.renderChannelTitle(channel)}
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
