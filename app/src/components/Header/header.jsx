import React, { Component } from 'react';
import avatar from "../../images/avatar.png";
import _ from "lodash";


export default class Header extends Component {
    render() {
        const { store } = this.props;
        //const channels = store.getChannels();
        const activeChannel = store.getActiveChannel();
        return (
            <div className='header'>
                <div className='left'>
                    <button className='left-action'><i className='icon-settings-streamline-1'/></button>
                    <button className='rignt-action'><i className='icon-edit-modify-streamline'/></button>
                    <h2>Messenger</h2>
                </div>
                <div className='content'>
                    <h2>
                        {_.get(activeChannel, 'title', '')}
                        </h2>
                </div>
                <div className='right'>
                    <div className='user-bar'>
                        <div className='profile-name'>Daria Nikiforova</div>
                        <div className='profile-image'>
                            <img src={avatar} alt='' />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
