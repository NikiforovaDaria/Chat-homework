import React,{Component} from 'react';
import moment from 'moment';


export default class UserMenu extends Component{
  constructor(props){
    super(props);
    this.onClickOutside = this.onClickOutside.bind(this);
    this.state = {
      isUserProfile: false,
    }
  }

  onClickOutside(event){
    if(this.ref && !this.ref.contains(event.target)){
      if(this.props.onClose){
        this.props.onClose();
      }
    }
  }

  componentDidMount(){
    window.addEventListener('mousedown', this.onClickOutside);
  }

  componentWillUnmount(){
    window.removeEventListener('mousedown', this.onClickOutside);
  }

  render(){
    const {store} = this.props;
    const user = store.getCurrentUser();
    user.avatar = store.loadUserAvatar(user);
    return <div className="user-menu" ref={(ref) => this.ref = ref}>
      {user ? <div>
                <h2>My menu</h2>
                <ul className="menu">
                  <li><button onClick={() => {
                        this.setState({
                          isUserProfile: !this.state.isUserProfile,
                      });
                    }} type="button">My Profile</button>
                  </li>
                  {this.state.isUserProfile ? <li className='user-profile'>
                    <h3>My profile:</h3>
                    <img src={user.avatar} alt=''/>
                    <p>Name: {user.name}</p>
                    <p>Email: {user.email}</p>
                    <p>Joined: {moment(user.created).fromNow()}</p>
                  </li> : null }
                  <li><button onClick={() => {
                        if(this.props.onClose) {
                            this.props.onClose();
                        }
                        store.signOut();
                    }} type="button">Sign Out</button></li>
                </ul>
        </div> : null }
    </div>
  }
}