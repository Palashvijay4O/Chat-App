const users = []


// Handling rooms logic in this file itself, TODO: Move it to separate utility
// Logic can be optimized

const rooms = []

const getListOfActiveRooms = () => {

    const activeRooms = rooms.filter((room) => {
        //console.log(room.roomName)
        var users = getUsersInRoom(room.roomName)
        //console.log(users)
        if(!users || users.length === 0) {
            return false;
        }
        return true
    })

    return activeRooms
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
    const roomAlreadyActive = rooms.find((room) => {
        return room.roomName === room
    })
    if(!roomAlreadyActive) {
        rooms.push({roomName: room})
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