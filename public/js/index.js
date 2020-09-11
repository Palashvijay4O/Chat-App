const socket = io()

const $roomList = document.querySelector('#room-list')
const roomListTemplate = document.querySelector('#room-list-template').innerHTML

socket.emit('getActiveRooms', () => {
    
})

socket.on('roomList', ({rooms}) => {
    if(rooms.length > 0) {
        const html = Mustache.render(roomListTemplate, {rooms})
        $roomList.innerHTML = html
    }
    else {
        const html = Mustache.render(roomListTemplate, {rooms, noActiveRoomsMessage: "No active rooms found."})
        $roomList.innerHTML = html
    }
})

document.querySelector('#loginForm').addEventListener('submit', (event) => {
    localStorage.setItem('username', document.querySelector('#loginForm').querySelector('input[name="username"]').value)
    localStorage.setItem('room', document.querySelector('#loginForm').querySelector('input[name="room"]').value)
})