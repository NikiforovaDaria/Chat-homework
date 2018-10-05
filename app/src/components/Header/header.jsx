import React, { Component } from 'react';
import avatar from "../../images/avatar.png";
import _ from "lodash";
import { ObjectID } from '../../Helpers/objectid';
import { OrderedMap } from "immutable";
import SearchUser from "../SearchUser/searchUser";


export default class Header extends Component {
    constructor(props) {
        super(props);

        this.state = {
            searchUser: '',
            showSearchUser: false,
        }

        this._onCreateChannel = this._onCreateChannel.bind(this);
    }

    _onCreateChannel() {
        const {store} = this.props;

        const channelId = new ObjectID().toString();

        const channel = {
            _id: channelId,
            title: `New message`,
            lastMessage: ``,
            members: new OrderedMap(),
            messages: new OrderedMap(),
            isNew: true,
            created: new Date(),
        }

        store.onCreateNewChannel(channel);
    }

    render() {
        const { store } = this.props;
        //const channels = store.getChannels();
        const activeChannel = store.getActiveChannel();
        return (
            <div className='header'>
                <div className='left'>
                    <button className='left-action'><i className='icon-settings-streamline-1'/></button>
                    <h2>Messenger</h2>
                    <button className='right-action' onClick={this._onCreateChannel}><i className='icon-edit-modify-streamline'/></button>
                    
                </div>
                <div className='content'>
                {_.get(activeChannel, 'isNew') ? <div className='toolbar'>
                        <label>To: </label>
                        <input type='text' value={this.state.searchUser} placeholder='Type name of person...'
                        onChange={(event) => {
                            const searchUserText = _.get(event, 'target.value');
                            this.setState({
                                searchUser: searchUserText,
                                showSearchUser: true,
                            })
                        }}
                        />

                        {this.state.showSearchUser ? 
                        <SearchUser store={store} search={this.state.searchUser} onSelect={(user) => {
                            this.setState({
                                showSearchUser: false,
                                searchUser: '',
                            }, () => {
                                const userId = _.get(user, '_id');
                                const channelId = _.get(activeChannel, '_id');
                                store.addUserToChannel(channelId, userId);
                            })
                        }}/> : null }
                    </div> : <h2> {_.get(activeChannel, 'title', '')} </h2>
                }
                    
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
