import React from 'react';

//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
//toast.configure()

// import UIfx from 'uifx';
// import mp3File from './../../sounds/juntos.mp3';
const isMobileAgent = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;
function swipedetect(el, callback){
  
    var touchsurface = el,
    dist,
    swipedir,
    startX,
    startY,
    distX,
    distY,
    threshold = 150, //required min distance traveled to be considered swipe
    restraint = 300, // maximum distance allowed at the same time in perpendicular direction
    allowedTime = 300, // maximum time allowed to travel that distance
    elapsedTime,
    startTime,
    handleswipe = callback || function(swipedir){}
  
    touchsurface.addEventListener('touchstart', function(e){
        var touchobj = e.changedTouches[0]
        swipedir = 'none'
        dist = 0
        startX = touchobj.pageX
        startY = touchobj.pageY
        startTime = new Date().getTime() // record time when finger first makes contact with surface
        e.preventDefault()
    }, false)
  
    touchsurface.addEventListener('touchmove', function(e){
        e.preventDefault() // prevent scrolling when inside DIV
    }, false)
  
    touchsurface.addEventListener('touchend', function(e){
        var touchobj = e.changedTouches[0]
        distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
        distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
        elapsedTime = new Date().getTime() - startTime // get time elapsed
        if (elapsedTime <= allowedTime){ // first condition for awipe met
            if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
                swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
            }
            else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
                swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
            }
        }
        handleswipe(swipedir)
        e.preventDefault()
    }, false)
}



var $messages, obj; 
class MessagesContainer extends React.Component {
    
    constructor(props) {
        super(props)
        //this.beep = new UIfx({asset: mp3File});
        this.state = {
            messages: [],
            typingMessage: ''
        }
        this.socket = this.props.socket

        this.socket.on('message', (message) => {
            const messageObj = {
                username: message.username,
                text: message.text,
                createdAt: moment(message.createdAt).format('h:mm a')
            }
            this.setState({
                messages: [...this.state.messages, messageObj]
            })
            this.autoScroll()
            //this.beep.play()
            document.getElementById('notification').autoplay = true;
            document.getElementById('notification').load()
            //document.getElementById('notification').play()
        })

        this.handleSend = event => {
            event.preventDefault()
            let message = event.target.elements.messageTxt.value;
            if (message === '')
                return;
            document.getElementById('send-button').setAttribute('disabled', 'disabled')
            this.socket.emit('sendMessage', message, (error) => {
                document.getElementById('send-button').removeAttribute('disabled')
                document.querySelector('#message-box').value = '';

                if(isMobileAgent)
                    document.activeElement.blur()
                else
                    document.querySelector('#message-box').focus()
                 
                if(error) {
                    return console.log(error)
                }
            });
        }

        this.timeout = (emitEvent, ms) => {
            var timeOut, promise
        
            promise = new Promise((resolve, reject) => {
                timeOut = setTimeout(() => {
                    resolve(this.socket.emit(emitEvent))
                }, ms)
            })
        
            return {
                promise,
                cancel: function() { clearTimeout(timeOut) }
            }
        }

        this.handleKeyDown = event => {
            if(obj) {
                obj.cancel()
            }
        
            this.timeout('typingEvent', 500)
        }

        this.handleKeyUp = event => {
            obj = this.timeout('notTypingEvent', 3000)
        }

        this.socket.on('typingEventClient', ({text, isTyping}) => {

            if(isTyping) {
                this.setState({typingMessage : text})
            }
            else {
                this.setState({typingMessage : ''})
            }
        })
    }

    componentDidMount() {
        $messages = document.querySelector('#messages')
        var $sidebar = document.querySelector('#sidebar')
        if(isMobileAgent) {
            var el1 = $messages, el2 = $sidebar

            
            swipedetect(el1, function(swipedir){
            //swipedir contains either "none", "left", "right", "top", or "down"
                if (swipedir === 'right') {
                    //alert('You just swiped right!');
                    document.getElementById('sidebar').style.setProperty('display', 'block');
                    document.getElementById('chat-main').style.setProperty('display', 'none');
                    document.getElementById('sidebar').style.setProperty('width', '100vw');
                    document.getElementById('chat-main').style.setProperty('width', '0vw');
                }
            })

            swipedetect(el2, function(swipedir){
                //swipedir contains either "none", "left", "right", "top", or "down"
                if (swipedir === 'left') {
                    //alert('You just swiped left!');
                    document.getElementById('sidebar').style.setProperty('display', 'none');
                    document.getElementById('chat-main').style.setProperty('display', 'flex');
                    document.getElementById('sidebar').style.setProperty('width', '0vw');
                    document.getElementById('chat-main').style.setProperty('width', '100vw');
                }
            })
            
        }
    }

    autoScroll() {
        // New message element
    
        const $newMessage =  $messages.lastElementChild
        
        // height of new message 
        const newMessageStyles = getComputedStyle($newMessage)
        const newMessageMargin = parseInt(newMessageStyles.marginBottom)
        const newMessageHeight = $newMessage.offsetHeight + newMessageMargin
    
        // Visible height
        const visibleHeight = $messages.offsetHeight
    
        // Height of message container
        const containerHeight = $messages.scrollHeight
    
        // How far I have scrolled
        const scrollOffSet = $messages.scrollTop + visibleHeight
    
        if(containerHeight - newMessageHeight <= scrollOffSet) {
            $messages.scrollTop = $messages.scrollHeight
        }
    }

    render() {
        return (
            <div id="chat-main" className="chat__main">
                
                    <div id="messages" className="chat__messages">
                        {this.state.messages.map((message, i) => {
                            return (
                                <div key={i} className="message">
                                    <p>
                                        <span className="message__name">{message.username}</span>
                                        <span className="message__meta">{message.createdAt}</span>
                                    </p>
                                    <p>{message.text}</p>
                                </div>
                            )
                        })}
                    </div>
                    <div id="user-typing-box" className="typing__message">
                        <div>
                            <p>
                                {this.state.typingMessage}
                            </p>
                        </div>
                    </div>
                            
                    <div className="compose">
                        <form id="message-form" onSubmit={this.handleSend}>
                            <input id="message-box" type="text" name="messageTxt" placeholder="Type your message..." required autoComplete="off" onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp}></input>
                            <button id="send-button" className="send-button"></button>
                        </form>
                        {/* <!-- <button id="send-location">Share Location</button> --> */}
                    </div>
            </div>
        )
    }
}

export default MessagesContainer;