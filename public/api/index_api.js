const socket = io()

// @Depricated
// const $roomList = document.querySelector('#room-list')

// const roomListTemplate = document.querySelector('#room-list-template').innerHTML

// var VIEWPORT_HEIGHT = $('<div id="vh-element" style="height:100vh"></div>"').appendTo('body').height();
// console.log(VIEWPORT_HEIGHT)
// $('#vh-element').remove();

// Fix for bug #2 -- NOT WORKING 
//let bannerHeight = window.getComputedStyle(document.getElementsByClassName('banner')[0], null).getPropertyValue('height');

//document.getElementsByClassName('main-container')[0].style.setProperty('height', ((VIEWPORT_HEIGHT - bannerHeight)))

// Fix for bug #2 -- WORKING
window.onload = (event) => {
    document.querySelector(':root').style.setProperty('--vh', window.innerHeight/100 + 'px');
    document.querySelector('.main-container').style.setProperty('display', 'flex');
}

window.addEventListener('resize', (event) => { 
    document.querySelector(':root').style.setProperty('--vh', window.innerHeight/100 + 'px');
})


// @Depricated
// socket.emit('getActiveRooms', () => {
// })

// socket.on('roomList', ({rooms}) => {
//     if(rooms.length > 0) {
//         const html = Mustache.render(roomListTemplate, {rooms, roomDetails: function() {
//             return this.roomName + " (" + this.participantsCount + ")"
//         }})
//         $roomList.innerHTML = html
//     }
//     else {
//         const html = Mustache.render(roomListTemplate, {noActiveRoomsMessage: "No active rooms found."})
//         $roomList.innerHTML = html
//     }
// })

const fetchAsync = async function () {
    const link = location.origin + '/chat/';
    
    const response = await fetch(link, {method: 'POST', headers: {
            'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                username: 'jyoti',
                room: 'oracle'
            })
        })
    
    return response.json()
}


document.querySelector('#loginForm').addEventListener('submit', (event) => {
    localStorage.setItem('username', document.querySelector('#loginForm').querySelector('input[name="username"]').value)
    localStorage.setItem('room', document.querySelector('#loginForm').querySelector('input[name="room"]').value)

    // Instead send a post request here
})

window.onbeforeunload = (event) => {
    socket.disconnect()
}