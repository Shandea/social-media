const { Server } = require("socket.io")
const http = require("http")


module.exports = {


    socketServer(app) {


        const server = http.createServer(app)

        const io = new Server(server, {
            cors: {
                origin: ["http://localhost:3000"],
                methods: ['GET', 'POST']
            }
        })

        io.on('connection', (socket) => {
            console.log("socket-Id,", socket.id)


            socket.on('loggedIn', (data) => { // from Login
                // console.log("Scoket - logged In", data)
                io.emit("updateLoggedIn", data) // to RightBody
            })
            socket.on('loggedOut', (data) => {  // from logged in users
                // console.log("Socket - logged Out", data)
                io.emit("updateLoggedOut", data) // to RightBody
            })

            socket.on('feedPost', (data) => {     //from AddFeed
                // console.log("socket feed", data)
                io.emit("feedUpdated", data) // to Feed
            })

            socket.on("addFriend", (data) => { //From ViewProfile
                console.log("socket add friend", data)
                // ATTEMT to only send ot users affected by change
                // io.emit("updateFriend", data) // to FriendList
                io.emit("updateFriend", data) // to FriendList
            })




            socket.on('join_room', (data) => {
                socket.join(data)
                console.log("room joined", data)
            })

        })

        return server

    }

}