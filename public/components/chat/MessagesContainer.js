import React from 'react';
import Toast from 'react-bootstrap/Toast'
//import { ToastContainer, toast } from 'react-toastify';
//import 'react-toastify/dist/ReactToastify.css';
//toast.configure()

const isMobileAgent = (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) ? true : false;
// function swipedetect(el, callback){
  
//     var touchsurface = el,
//     dist,
//     swipedir,
//     startX,
//     startY,
//     distX,
//     distY,
//     threshold = 200, //required min distance traveled to be considered swipe
//     restraint = 400, // maximum distance allowed at the same time in perpendicular direction
//     allowedTime = 500, // maximum time allowed to travel that distance
//     elapsedTime,
//     startTime,
//     handleswipe = callback || function(swipedir){}
  
//     touchsurface.addEventListener('touchstart', function(e){
//         var touchobj = e.changedTouches[0]
//         swipedir = 'none'
//         dist = 0
//         startX = touchobj.pageX
//         startY = touchobj.pageY
//         startTime = new Date().getTime() // record time when finger first makes contact with surface
//         //e.preventDefault()
//     }, false)
  
//     // touchsurface.addEventListener('touchmove', function(e){
//     //     let o = e.changedTouches[0]
//     //     if(o.pageX - startX > 0) {
//     //          e.preventDefault()
//     //          // prevent scrolling when inside DIV
//     //     } else {
//     //         return ; 
//     //     }
//     // }, false)
  
//     touchsurface.addEventListener('touchend', function(e){
//         var touchobj = e.changedTouches[0]
//         distX = touchobj.pageX - startX // get horizontal dist traveled by finger while in contact with surface
//         distY = touchobj.pageY - startY // get vertical dist traveled by finger while in contact with surface
//         elapsedTime = new Date().getTime() - startTime // get time elapsed
//         if (elapsedTime <= allowedTime){ // first condition for awipe met
//             if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint){ // 2nd condition for horizontal swipe met
//                 swipedir = (distX < 0)? 'left' : 'right' // if dist traveled is negative, it indicates left swipe
//             }
//             else if (Math.abs(distY) >= threshold && Math.abs(distX) <= restraint){ // 2nd condition for vertical swipe met
//                 swipedir = (distY < 0)? 'up' : 'down' // if dist traveled is negative, it indicates up swipe
//             }
//         }
//         handleswipe(swipedir)
//         //if(swipedir === 'left' || swipedir === 'right')
//         //e.preventDefault()
//     }, false)
// }



var $messages, obj; 
class MessagesContainer extends React.Component {
    
    constructor(props) {
        super(props)
        this.state = {
            messages: [],
            typingMessage: '',
            notificationState: {
                show: true,
                display: 'none'
            }
        }
        this.socket = this.props.socket

        this.socket.on('message', (message) => {
            if(!message.text) {
                this.setState({notificationState: {'show': true, 'display' : 'block'}})
            }
            const messageObj = {
                id: message.id,
                username: message.username,
                text: message.text,
                image: message.image,
                createdAt: moment(message.createdAt).format('h:mm a')
            }
            this.setState({
                //[id] : messageObj
                messages: [...this.state.messages, messageObj]
            })
            this.autoScroll()

            // play the notification sound
            document.getElementById('notification').autoplay = true;
            document.getElementById('notification').load()
        })

        this.handleSend = event => {
            event.preventDefault()
            let message = event.target.elements.messageTxt.value;
            let file = document.getElementById('send-file').files[0].slice(0,500000, "image/png")
            
            if (message === '' && !file)
                return;
            
            // Sending file from here
            
            if(file) {
                let reader = new FileReader()
                reader.readAsDataURL(file)
                document.getElementById('send-file').setAttribute('disabled', 'disabled')
                document.getElementById('send-button').setAttribute('disabled', 'disabled')
                reader.onload = () => {
                    let fileBuffer = reader.result;
                    this.socket.emit('image', { image: true, buffer: fileBuffer}, (error) => {
                        console.log('image upload completed from client');
                        document.getElementById('send-file').removeAttribute('disabled')
                        document.getElementById('send-button').removeAttribute('disabled')
                        if(error) {
                            return console.log(error)
                        }
                    });
                }

                document.getElementById('send-file').value = ''
            }

            if(message !== '') {
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
        // var $sidebar = document.querySelector('#sidebar')
        // if(isMobileAgent) {
        //     var el1 = $messages, el2 = $sidebar

            
        //     swipedetect(el1, function(swipedir){
        //     //swipedir contains either "none", "left", "right", "top", or "down"
        //         if (swipedir === 'right') {
        //             //alert('You just swiped right!');
        //             document.getElementById('sidebar').style.setProperty('display', 'block');
        //             document.getElementById('chat-main').style.setProperty('display', 'none');
        //             document.getElementById('sidebar').style.setProperty('width', '100vw');
        //             document.getElementById('chat-main').style.setProperty('width', '0vw');
        //         }
        //     })

        //     swipedetect(el2, function(swipedir){
        //         if (swipedir === 'left') {
        //             //alert('You just swiped left!');
        //             document.getElementById('sidebar').style.setProperty('display', 'none');
        //             document.getElementById('chat-main').style.setProperty('display', 'flex');
        //             document.getElementById('sidebar').style.setProperty('width', '0vw');
        //             document.getElementById('chat-main').style.setProperty('width', '100vw');
        //         }
        //     })
            
        // }
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

    getImgSrc(src) {
        return src.toString('base64');
    }
    
    render() {
        return (
            <div id="chat-main" className="chat__main">
                    <div aria-live="polite" aria-atomic="true" style={{display: this.state.notificationState.display, position: 'absolute',  top: '20px' , right: '0', minHeight: '50px', zIndex: 2, width: 'calc(30 * var(--vw))'}}>
                            <Toast onClose={() => this.setState({notificationState: {'show': false, 'display' : 'none'}})} show={this.state.notificationState.show} delay={3000} autohide>
                            <Toast.Header>
                                <strong className="mr-auto">Notification</strong>
                                <small>just now</small>
                            </Toast.Header>
                            <Toast.Body>Someone has joined the chat!</Toast.Body>
                            </Toast>
                    </div>
                    <div id="messages" className="chat__messages">
                        {this.state.messages.map((message, i) => {
                            return (
                                <div key={i} className="message">
                                    <p>
                                        <span className="message__name">{message.username}</span>
                                        <span className="message__meta">{message.createdAt}</span>
                                    </p>
                                    {message.text && message.image ? <img className={isMobileAgent ? 'img-mob' : 'img-desk'} src={this.getImgSrc(message.text)}></img> : ''}
                                    {message.text && !message.image ? <p>{message.text}</p> : ''}
                                    
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
                        <form id="message-form" onSubmit={this.handleSend} encType="multipart/form-data">
                            {/* <input id="message-box" type="text" name="messageTxt" placeholder="Type your message..." autoComplete="off" onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp}></input>
                            <button id="send-button" className="send-button"></button>
                            <input type="file" id="send-file" name="send-file" className="attachFile"/> */}
                            <div style={{display : 'block', flexGrow: 1}}>
                                <div style={{display : 'flex'}}>
                                    <input id="message-box" type="text" name="messageTxt" placeholder="Type your message..." autoComplete="off" onKeyDown={this.handleKeyDown} onKeyUp={this.handleKeyUp}></input>
                                    <button id="send-button" className="send-button"></button>
                                </div>
                                <input type="file" id="send-file" name="send-file" className="attachFile"/>
                            </div>
                        </form>
                        {/* <!-- <button id="send-location">Share Location</button> --> */}
                    </div>
            </div>
        )
    }
}

export default MessagesContainer;