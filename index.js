/**                                                              +-->
 *                                                               |
 *             Share this URL with friends **after forking** ----+
 * 
 * README:
 * 
 * Make sure to **fork this project** and play on your own fork, 
 * as each server only supports 1 game at a time!
 * 
 * To share with your friend, copy over the URL to the right 
 * (ex. https://competitive-2048-demo--mikeshi42.repl.co) and
 * send it to them to connect!
 * 
 * Alternatively to test with yourself, just click on the
 * "Open in New Tab" button right of the URL bar on the 
 * window to the right.
 */

const express = require('express');
const socketio = require('socket.io');
const http = require('http');

const app = express();
const server = http.Server(app);
const io = socketio(server); // Attach socket.io to our server

app.use(express.static('public')); // Serve our static assets from /public

server.listen(3000, () => console.log('server started'));

const connections = [null, null];

// Handle a socket connection request from web client
io.on('connection', function (socket) {
  
  // Find an available player number
  let playerIndex = -1;
  for (const i in connections) {
    if (connections[i] === null) {
      playerIndex = i;
    }
  }
  
  // Tell the connecting client what player number they are
  socket.emit('player-number', playerIndex);
  
  console.log(`Player ${playerIndex} has connected`);
  
  // Ignore player 3
  if (playerIndex == -1) return;
  
  connections[playerIndex] = socket;
  
  // Tell everyone else what player number just connected
  socket.broadcast.emit('player-connect', playerIndex);
  
  socket.on('actuate', function (data) {
    console.log(`Actuation from ${playerIndex}`);

    const { grid, metadata } = data; // Get grid and metadata properties from client
    
    const move = {
      playerIndex,
      grid,
      metadata,
    };

    // Emit the move to all other clients
    socket.broadcast.emit('move', move);
  });

  socket.on('disconnect', function() {
    console.log(`Player ${playerIndex} Disconnected`);
    connections[playerIndex] = null;
  });


});
