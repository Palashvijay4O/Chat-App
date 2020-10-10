import React from 'react';
import Banner from './Banner';
import ChatContainer from './ChatContainer';

const isMobileAgent = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;

class ChatPage extends React.Component {
    
        
    componentDidMount() {
        document.querySelector(':root').style.setProperty('--vh', window.innerHeight/100 + 'px');
        // STRANGELY THIS IS CREATING PROBLEM SO DON'T UNCOMMENT THIS LINE
        //document.querySelector(':root').style.setProperty('--vw', window.innerWidth/100 + 'px');
        document.querySelector('.main-container').style.setProperty('display', 'flex');

        window.addEventListener('resize', () => { 
            if(!isMobileAgent) {
                document.querySelector(':root').style.setProperty('--vh', window.innerHeight/100 + 'px');
                document.querySelector(':root').style.setProperty('--vw', window.innerWidth/100 + 'px');
            }
        })

        document.querySelector('#loading').remove();
        
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