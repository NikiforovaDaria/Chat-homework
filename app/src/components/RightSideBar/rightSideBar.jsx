import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';
import classNames from "classnames";

export default class RightSideBar extends Component {

    render() {
        const {store} = this.props;
        const activeChannel = store.getActiveChannel();
        const members = store.getMembersFromChannel(activeChannel);

        return (
            <div className='sidebar-right'>
                { members.size > 0 ?
                <div>
                    <h2 className='title'>Members:</h2>
                    <div className='members'>
                        {members.map((member, key)=>{
                            const isOnline = _.get(member, 'online', false);
                            return(
                                <div key={key} className='member'>
                                    <div className='user-image'>
                                        <img src={_.get(member, 'avatar')} alt=''/>
                                        <span className={classNames('user-status', {'online': isOnline})}/>
                                    </div>
                                    <div className='member-info'>
                                        <h2>{member.name} <span className={classNames('user-status', {'online': isOnline})}>{isOnline ? 'Online' : 'Offline'}</span></h2>
                                        <p>joined: {moment(member.created).fromNow()}</p>
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div> : null
                }
            </div>
        );
    }
}
