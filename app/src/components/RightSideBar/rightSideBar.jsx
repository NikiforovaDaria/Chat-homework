import React, { Component } from 'react';
import _ from 'lodash';
import moment from 'moment';

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
                            return(
                                <div key={key} className='member'>
                                    <div className='user-image'>
                                        <img src={_.get(member, 'avatar')} alt=''/>
                                    </div>
                                    <div className='member-info'>
                                        <h2>{member.name}</h2>
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
