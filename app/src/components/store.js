import {OrderedMap} from 'immutable';
import _ from "lodash";

const users = OrderedMap({
    '1': {_id: '1', name: 'Tom', created: new Date()},
    '2': {_id: '2', name: 'Alex', created: new Date()},
    '3': {_id: '3', name: 'Kevin', created: new Date()}

})

export default class Store{
    constructor(appComponent){
        this.app = appComponent;
        this.messages = new OrderedMap();
        this.channels = new OrderedMap();
        this.activeChannelId = null;
        this.user = {
            _id: '1',
            name: 'Toan',
            created: new Date(),
        }
    }

    getCurrentUser(){
        return this.user;
    }

    getActiveChannel(){
        const channel = this.activeChannelId ? this.channels.get(this.activeChannelId) : this.channels.first();
        return channel
    }

    addMessage(id, message={}){
        this.messages = this.messages.set(`${id}`, message)

        //add new message id to current channel=> message
        const channelId = _.get(message, 'channelId')
        if (channelId) {
            const channel = this.channels.get(channelId);
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
        return this.channels.valueSeq();
    }

    setActiveChannelId(id){
        this.activeChannelId = id;
        this.update();
    }

    getMessagesFromChannel(channel){
        let messages = [];
        if (channel){
            channel.messages.map((value, key)=>{
                const message = this.messages.get(key)
                messages.push(message)
            })
    }
    return messages;
}

    getMembersFromChannel(channel){
        const members =[]
        if(channel){
            channel.members.map((value, key)=>{
                const member = users.get(key);
                members.push(member)
            })
        }

        return members;
    }

    update(){
        this.app.forceUpdate();
    }
}