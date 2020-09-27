import React from 'react';
import Banner from './Banner';
import ChatContainer from './ChatContainer';

class ChatPage extends React.Component {
    
        
    componentDidMount() {
        document.querySelector(':root').style.setProperty('--vh', window.innerHeight/100 + 'px');
        document.querySelector('.main-container').style.setProperty('display', 'flex');
    }

    render() {
        return (
            <div>
                <Banner value={this.props.value}/>
                <ChatContainer />
            </div>
        )
    }
}


export default ChatPage;