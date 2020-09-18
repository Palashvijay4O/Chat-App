const socket = io()

const $roomList = document.querySelector('#room-list')
const roomListTemplate = document.querySelector('#room-list-template').innerHTML
import React from "react";
import ReactDOM from 'react-dom';
import { Route, Link, BrowserRouter as Router } from 'react-router-dom'
import App from  '../components/App';


ReactDOM.render(
    <App />, 
    document.getElementById('root')
)

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