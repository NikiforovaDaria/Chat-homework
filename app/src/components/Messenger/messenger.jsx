import React, { Component } from 'react';
import Header from '../Header/header';
import LeftSideBar from '../LeftSideBar/leftSideBar';
import RightSideBar from '../RightSideBar/rightSideBar';
import Store from "../store";
import Messages from '../Messages/messages';


export default class Messenger extends Component {
    constructor(props){
        super(props);
        
        this.state = { 
            height: window.innerHeight,
            store: new Store(this),
        }
            this._onResize = this._onResize.bind(this);
    }    

    _onResize() {
        this.setState({
            height: window.innerHeight
        })
    };

    componentDidMount() {
        window.addEventListener('resize', this._onResize)
    }

    componentWillUnmount() {
        window.removeEventListener('resize', this._onResize)
    }

    render() {
        const { height, store } = this.state;
        const style = { height: height };

        return (
            <div style={style} className='app-messenger'>
                <Header store={store}/>
                <div className='main'>
                    <LeftSideBar store={store}/>
                    <Messages store={store}/>
                    <RightSideBar store={store}/>
                </div>
            </div>
        );
    }
}
