import React from 'react';
import Banner from './Banner';
import ChatContainer from './ChatContainer';

class ChatPage extends React.Component {
    
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