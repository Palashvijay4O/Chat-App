import React from 'react';
import Banner from './Banner';
import ChatContainer from './ChatContainer';

const isMobileAgent = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;

class ChatPage extends React.Component {
    
        
    componentDidMount() {
        document.querySelector(':root').style.setProperty('--vh', window.innerHeight/100 + 'px');
        document.querySelector('.main-container').style.setProperty('display', 'flex');

        window.addEventListener('resize', () => { 
            if(!isMobileAgent)
                document.querySelector(':root').style.setProperty('--vh', window.innerHeight/100 + 'px');
        })

        document.querySelector('#loading').remove();

        if(isMobileAgent) {
            document.getElementById('sidebar').style.setProperty('display', 'none');
        }
        
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