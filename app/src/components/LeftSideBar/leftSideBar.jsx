import React, { Component } from 'react';
import avatar from "../../images/avatar.png";
import { OrderedMap } from "immutable";
import classNames from "classnames";
import _ from "lodash";


class LeftSideBar extends Component {
    constructor(props) {
        super(props);
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
                            <div key={channel._id} className={classNames('channel', {'active': _.get(activeChannel, '_id') === _.get(channel, '_id', null)})}
                            onClick={(key)=>   {
                                store.setActiveChannelId(channel._id)
                            }} >
                                <div className='user-image'>
                                    <img src={avatar} alt='' />
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
