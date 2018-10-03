import React, { Component } from 'react';
import Messenger from "./Messenger/messenger";
// import Store from './store';

export default class App extends Component {
    render() {
        return (
            <div className='app-wrapper'>
                <Messenger />
            </div>
        );
    }
}

