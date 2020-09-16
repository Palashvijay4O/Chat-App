const socket = io()

// Elements
const $messageForm = document.querySelector('#message-form')
const $messageFormInput = $messageForm.querySelector('input')
const $messageFormButtom = $messageForm.querySelector('button')
const $sendLocationButton = document.querySelector('#send-location')
const $messages = document.querySelector('#messages')
const $sidebar = document.querySelector('#sidebar')
const $messageBox = document.querySelector('#message-box')
const $userTypingBox = document.querySelector('#user-typing-box')
const $leaveButton = document.querySelector('#leave-button')

// Templates
const messageTemplate = document.querySelector('#message-template').innerHTML
const locationMessageTemplate = document.querySelector('#location-message-template').innerHTML
const sideBarTemplate = document.querySelector('#sidebar-template').innerHTML
const userTypingTemplate = document.querySelector('#user-typing-template').innerHTML


const username = localStorage.getItem('username')
const room = localStorage.getItem('room')

var typingCounter;
var obj;

const autoScroll = () => {
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

socket.on('locationMessage', (locationMessage) => {
    const html = Mustache.render(locationMessageTemplate, {
        username: locationMessage.username,
        locationMessage: locationMessage.text,
        createdAt: moment(locationMessage.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoScroll()
})

socket.on('message', (message) => {
    const html = Mustache.render(messageTemplate, {
        username: message.username,
        message: message.text,
        createdAt: moment(message.createdAt).format('h:mm a')
    })
    $messages.insertAdjacentHTML('beforeend', html)
    autoScroll()
})

socket.on('roomData', ({room, users}) => {
    const html = Mustache.render(sideBarTemplate, {
        room,
        users
    })
    $sidebar.innerHTML = html
})

socket.on('typingEventClient', ({text, isTyping}) => {
    //console.log(message)
    if(isTyping) {
        const html = Mustache.render(userTypingTemplate, {message: text})
        $userTypingBox.innerHTML = html
    }
    else {
        const html = Mustache.render(userTypingTemplate, {message: text})
        $userTypingBox.innerHTML = ''
    }
})

socket.emit('join', {username, room}, (error) => {
    if(error) {
        alert(error)
        location.href = '/'
    }
})

$messageForm.addEventListener('submit', (event) => {
        event.preventDefault()
        const message = event.target.elements.messageTxt.value
        if(message === '') {
            return ;
        }

        $messageFormButtom.setAttribute('disabled', 'disabled')
        
        socket.emit('sendMessage', message, (error) => {
            //setTimeout(() => {}, 2000)
            $messageFormButtom.removeAttribute('disabled')
            $messageFormInput.value = ''
            $messageFormInput.focus()

            if(error) {
                return console.log(error)
            }

            console.log('The message was delivered!')
            
        })
})


$messageBox.addEventListener('keydown', (event) => { 
    // Need promise based implementation here as well
    if(obj) {
        obj.cancel()
    }

    timeout('typingEvent', 500)
})

const timeout = (emitEvent, ms) => {
    var timeOut, promise

    promise = new Promise((resolve, reject) => {
        timeOut = setTimeout(() => {
            resolve(socket.emit(emitEvent))
        }, ms)
    })

    return {
        promise,
        cancel: function() { clearTimeout(timeOut) }
    }
}

$messageBox.addEventListener('keyup', (event) => {
    obj = timeout('notTypingEvent', 3000)
})

$sendLocationButton.addEventListener('click', (event) => {
    if(!navigator.geolocation) {
        return alert('Geolocation is not supported for your browser')
    }
    $sendLocationButton.setAttribute('disabled', 'disabled')
    navigator.geolocation.getCurrentPosition((position) => { 
        const {latitude, longitude} = position.coords
        socket.emit('sendLocation', {latitude, longitude}, (message) => {
            $sendLocationButton.removeAttribute('disabled')
        }) 
    })
})

$leaveButton.addEventListener('click', (event) => {
    var userInput = confirm('Do you want to leave this page??');
    if(userInput) {
        socket.emit('disconnet')
        location.href = '/'
    }
})

// window.onload = () => {
//     console.log('on load')

//     window.addEventListener('beforeunload', (event) => {
//         var confirmationMessage = 'It looks like you have been editing something. '
//                                     + 'If you leave before saving, your changes will be lost.';
    
//         (event || window.event).returnValue = confirmationMessage; //Gecko + IE
//         return confirmationMessage;
//     })
// }

window.addEventListener('beforeunload', (event) => {
            var confirmationMessage = 'Unsaved changes will be lost!!';
        
            (event || window.event).returnValue = confirmationMessage; //Gecko + IE
            //document.hasFocus() === false ? confirm('Do you want to leave this page??') : ''
            return confirmationMessage;
})

