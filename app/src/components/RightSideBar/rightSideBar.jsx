import React, { Component } from 'react';
import avatar from "../../images/avatar.png";

export default class RightSideBar extends Component {

    render() {
        const {store} = this.props;
        const activeChannel = store.getActiveChannel();
        const members = store.getMembersFromChannel(activeChannel);

        return (
            <div className='sidebar-right'>
                <h2 className='title'>Members:</h2>
                <div className='members'>
                    {members.map((member, key)=>{
                        return(
                            <div key={key} className='member'>
                                <div className='user-image'>
                                    <img src={avatar} alt=''/>
                                </div>
                                <div className='member-info'>
                                    <h2>{member.name}</h2>
                                    <p>joined: 3 days ago</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        );
    }
}
