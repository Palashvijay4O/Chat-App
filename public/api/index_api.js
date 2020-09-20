const { default: Header } = require("../components/Header")

const socket = io()

const $roomList = document.querySelector('#room-list')

const roomListTemplate = document.querySelector('#room-list-template').innerHTML

// Fix for bug #2
let bannerHeight = window.getComputedStyle(document.getElementsByClassName('banner')[0], null).getPropertyValue('height');

document.getElementsByClassName('main-container')[0].style.setProperty('height', ((window.innerHeight * 0.01 -bannerHeight) * 100))


socket.emit('getActiveRooms', () => {
})

socket.on('roomList', ({rooms}) => {
    if(rooms.length > 0) {
        const html = Mustache.render(roomListTemplate, {rooms, roomDetails: function() {
            return this.roomName + " (" + this.participantsCount + ")"
        }})
        $roomList.innerHTML = html
    }
    else {
        const html = Mustache.render(roomListTemplate, {noActiveRoomsMessage: "No active rooms found."})
        $roomList.innerHTML = html
    }
})

document.querySelector('#loginForm').addEventListener('submit', (event) => {
    localStorage.setItem('username', document.querySelector('#loginForm').querySelector('input[name="username"]').value)
    localStorage.setItem('room', document.querySelector('#loginForm').querySelector('input[name="room"]').value)
})