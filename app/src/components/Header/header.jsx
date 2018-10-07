import React, { Component } from 'react';
import avatar from "../../images/avatar.png";
import _ from "lodash";
import { ObjectID } from '../../Helpers/objectid';
import { OrderedMap } from 'immutable';
import SearchUser from '../SearchUser/searchUser';
import UserBar from '../UserBar/userBar';


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
        const currentUser = store.getCurrentUser();
        const currentUserId = _.get(currentUser, '_id');

        const channelId = new ObjectID().toString();

        const channel = {
            _id: channelId,
            title: ``,
            lastMessage: ``,
            members: new OrderedMap(),
            messages: new OrderedMap(),
            isNew: true,
            userId: currentUserId,
            created: new Date(),
        }
        channel.members = channel.members.set(currentUserId, true);
        store.onCreateNewChannel(channel);
    }

    render() {
        const { store } = this.props;
        //const channels = store.getChannels();
        const activeChannel = store.getActiveChannel();
        const members = store.getMembersFromChannel(activeChannel);
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
                        {
                            members.map((user, key) => {
                                return <span key={key} onClick={() => {
                                    store.removeMemberFromChannel(activeChannel, user);
                                }}>{_.get(user, 'name')}</span>
                            })
                        }
                        <input type='text' value={this.state.searchUser} placeholder='Type name of person...'
                        onChange={(event) => {
                            const searchUserText = _.get(event, 'target.value');
                            this.setState({
                                searchUser: searchUserText,
                                showSearchUser: true,
                            }, () => {
                                store.startSearchUsers(searchUserText);
                            })
                        }}
                        />

                        {this.state.showSearchUser ? 
                        <SearchUser store={store} onSelect={(user) => {
                            this.setState({
                                showSearchUser: false,
                                searchUser: '',
                            }, () => {
                                const userId = _.get(user, '_id');
                                const channelId = _.get(activeChannel, '_id');
                                store.addUserToChannel(channelId, userId);
                            })
                        }}/> : null }
                    </div> : store.renderChannelTitle(activeChannel)
                }
                    
                </div>
                <div className='right'>
                    <UserBar store={store}/>
                </div>
            </div>
        );
    }
}
