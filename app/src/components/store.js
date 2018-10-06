import {OrderedMap} from 'immutable';
import _ from "lodash";
import React from 'react';

const users = OrderedMap({
    '1': {_id: '1', email: 'tom@gmail.com', name: 'Tom', created: new Date(), avatar: `https://api.adorable.io/avatars/100/1.png`},
    '2': {_id: '2', email: 'tomas@gmail.com', name: 'Tomas', created: new Date(),  avatar: `https://api.adorable.io/avatars/100/2.png`},
    '3': {_id: '3', email: 'kevin@gmail.com', name: 'Kevin', created: new Date(),  avatar: `https://api.adorable.io/avatars/100/3.png`}
})

export default class Store{
    constructor(appComponent) {
        this.app = appComponent;
        this.messages = new OrderedMap();
        this.channels = new OrderedMap();
        this.activeChannelId = null;
        this.user = this.getUserFromLocalStorage();
    }

    getUserFromLocalStorage() {
        let user = null;
        const data = localStorage.getItem('me');
        try {
            user = JSON.parse(data);
        }
        catch(err){
            console.log(err);
        };

        return user;
    }

    searchUsers(search = "") {
        const keyWord = _.toLower(search)
        let searchItems = new OrderedMap();
        const currentUser = this.getCurrentUser();
        const currentUserId = _.get(currentUser, '_id');
        if(_.trim(search).length) {
            searchItems = users.filter((user) => _.get(user, '_id') !== currentUserId && 
                _.includes(_.toLower(_.get(user, 'name')), keyWord));
        }

        return searchItems.valueSeq();
    }

    getCurrentUser(){
        return this.user;
    }

    getActiveChannel(){
        const channel = this.activeChannelId ? this.channels.get(this.activeChannelId) : this.channels.first();
        return channel
    }

    addMessage(id, message={}){
        const user = this.getCurrentUser();
        message.user = user;
        this.messages = this.messages.set(`${id}`, message)

        //add new message id to current channel=> message
        const channelId = _.get(message, 'channelId')
        if (channelId) {
            let channel = this.channels.get(channelId);
            channel.isNew = false;
            channel.lastMessage = _.get(message, 'body', '');
            channel.messages = channel.messages.set(id, true);
            this.channels = this.channels.set(channelId, channel)
        }
        this.update()
    }

    getMessages(){
        return this.messages.valueSeq();
    }

    addChannel(index, channel = {}) {
        this.channels = this.channels.set(`${index}`, channel)
        this.update()
    }

    getChannels() {
        //return this.channels.valueSeq();

        this.channels = this.channels.sort((a, b) => a.created < b.created);
        return this.channels.valueSeq();
    }

    setActiveChannelId(id){
        this.activeChannelId = id;
        this.update();
    }

    getMessagesFromChannel(channel){
        let messages = new OrderedMap();
        if (channel){
            channel.messages.forEach((value, key)=>{
                const message = this.messages.get(key);
                messages = messages.set(key, message);
            })
        }
        return messages.valueSeq();
    }

    getMembersFromChannel(channel){
        let members = new OrderedMap();
        if(channel){
            channel.members.forEach((value, key)=>{
                const user = users.get(key);
                const loggedUser = this.getCurrentUser();
                if(_.get(loggedUser, '_id') !== _.get(user, '_id')) {
                    members = members.set(key, user);
                }
                
            })
        }

        return members.valueSeq();
    }

    onCreateNewChannel(channel = {}) {
        const channelId = _.get(channel, '_id');
        this.addChannel(channelId, channel);
        this.setActiveChannelId(channelId);
    }

    addUserToChannel(channelId, userId) {
        const channel = this.channels.get(channelId);

        if(channel) {
            channel.members = channel.members.set(userId, true);
            this.channels = this.channels.set(channelId, channel);
            this.update();
        }
    }

    renderChannelTitle(channel = null) {
        //const {store} = this.props; 
        const members = this.getMembersFromChannel(channel);
        const names = [];
        members.forEach((user) => {
            const name = _.get(user, 'name');
            names.push(name);
        })
        let title = _.join(names, ', ');
        if(!title && _.get(channel, 'isNew')) {
            title = 'New message';
        }
        return <h2>{title}</h2>
    }

    removeMemberFromChannel(channel = null, user = null) {
        if(!channel || !user) {
            return;
        }
        const userId = _.get(user, '_id');
        const channelId = _.get(channel, '_id');
        channel.members = channel.members.remove(userId);
        this.channels = this.channels.set(channelId, channel);
        this.update();
    }

    setCurrentUser(user) {
        this.user = user;
        if(user) {
            localStorage.setItem('me', JSON.stringify(user));
        }
        this.update();
    }

    login(email, password) {
        const userEmail = _.toLower(email);
        const _this = this;
        return new Promise ((resolve, reject)=>{
            const user = users.find((user) => user.email === userEmail);
            if(user) {
                _this.setCurrentUser(user);
            }
            return user ? resolve(user): reject('User not found.');
        })
        
    }

    signOut() {
        this.user = null;
        localStorage.removeItem('me');
        this.update();
    }

    update(){
        this.app.forceUpdate();
    }
}