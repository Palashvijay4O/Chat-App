const users = []


// Handling rooms logic in this file itself, TODO: Move it to separate utility
// Logic can be optimized

const rooms = []

const getListOfActiveRooms = () => {

    const activeRooms = rooms.filter((room) => {

        var users = getUsersInRoom(room.roomName)
        if(!users || users.length === 0) {
            return false;
        }
        return true
    })

    return activeRooms
}

const updateParticipantsCountInRoom = (room, eventType) => {
    if(eventType === 'create_and_add') {
        rooms.push({
            roomName: room,
            participantsCount: 1
        })
    }
    else if(eventType === 'add') {
        // TODO : further be reduced to updating the room
        const existingRoom = rooms.find((room_in) => room_in.roomName === room)
        existingRoom.participantsCount += 1
        const index = rooms.findIndex((room_in) => {
            return room_in.roomName === room
        })
    
        if(index !== -1) {
            rooms.splice(index, 1)[0]
        }

        rooms.push(existingRoom)
    }
    else if (eventType === 'remove') {
        const existingRoom = rooms.find((room_in) => room_in.roomName === room)
        existingRoom.participantsCount -= 1
        const index = rooms.findIndex((room_in) => {
            return room_in.roomName === room
        })
    
        if(index !== -1) {
            rooms.splice(index, 1)[0]
        }

        rooms.push(existingRoom)
    }
}

const addUser = ({id, username, room}) => {
    
    // Clean the data
    username = username.trim().toLowerCase()
    room = room.trim().toLowerCase()

    // Validate the data
    if(!username || !room) {
        return {
            error: "Username and room are required!"
        }
    }

    // Check if user exists
    const existingUser = users.find((user) => {
        return user.room === room && user.username === username
    })

    if(existingUser) {
        return {
            error: "Username is already used!"
        }
    }

    // Store user
    const user = {id, username, room}
    users.push(user)
    
    // Adding the list of all rooms
    // TODO : needs bit of refactoring
    const roomAlreadyActive = rooms.find((room_in) => {
        return room_in.roomName === room
    })
    if(!roomAlreadyActive) {
        updateParticipantsCountInRoom(room, 'create_and_add')
    }
    else {
        
        updateParticipantsCountInRoom(room, 'add')
    }

    return {
        user
    }
}

const removeUser = (id) => {
    const index = users.findIndex((user) => {
        return user.id === id
    })

    if(index !== -1) { 
        updateParticipantsCountInRoom(users[index].room, 'remove')
        return users.splice(index, 1)[0]
    }
}

const getUser = (id) => {
    return users.find((user) => user.id === id)
}

const getUsersInRoom = (room) => {
    const usersInRoom = users.filter((user) => {
        return user.room === room
    })

    return usersInRoom
}

module.exports = {
    addUser,
    removeUser,
    getUser,
    getUsersInRoom,
    getListOfActiveRooms
}