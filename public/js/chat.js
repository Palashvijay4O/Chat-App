import React from 'react';
import ReactDOM from 'react-dom';
import ChatPage from '../components/chat/ChatPage'
const socket = io()
const titleSite = 'EasyPing'

ReactDOM.render(
    <ChatPage value={titleSite}/>, 
    document.getElementById('root')
)


window.addEventListener('resize', () => { 
    if(!(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)))
        document.querySelector(':root').style.setProperty('--vh', window.innerHeight/100 + 'px');
})

$('#confirmDeletePopup .modal-footer button').on('click', (event) => {
    var $button = $(event.target)
    if($button.attr('id') === 'confirm-yes') {
        socket.emit('disconnet')
        location.href = '/'
        return;
    }
})

const fetchLink = async function () {
    const link = location.origin + '/invite/';
    
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



$('#invitationPopup').on('show.bs.modal', (event) => {
    // Encryption here
    
    const link = location.origin + '/join/';
    fetchLink().then((data) => {
        const queryString = data.responseSigned.username + '::' + data.responseSigned.room;
        $('#inviteLink').prop('value', link + '?q=' + queryString)
    });

})

$('#copyInvite').on('click', (event) => {
    var link = document.getElementById('inviteLink')
    link.select()
    link.setSelectionRange(0, 99999);

    try {
        document.execCommand('copy');
    } catch {
        return;
    }
})