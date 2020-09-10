const socket = io()

const $roomList = document.querySelector('#room-list')
const roomListTemplate = document.querySelector('#room-list-template').innerHTML


socket.on('roomList', ({rooms}) => {
    console.log(rooms)
    const html = Mustache.render(roomListTemplate, {rooms})
    $roomList.innerHTML = html
})


document.querySelector('#loginForm').addEventListener('submit', (event) => {
    localStorage.setItem('username', document.querySelector('#loginForm').querySelector('input[name="username"]').value)
    localStorage.setItem('room', document.querySelector('#loginForm').querySelector('input[name="room"]').value)
})

socket.emit('getActiveRooms', () => {
    
})