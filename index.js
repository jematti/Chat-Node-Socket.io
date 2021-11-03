const path = require('path');//trabajar con las rutas
const express = require('express');//llamara expresss
const app = express();

const socket = require('socket.io');//llamar modulo socket io

/*inicio Servidor*/
// settings
app.set('port', process.env.PORT || 3000);

app.use(express.static(path.join(__dirname, 'public')));//extrair la raiz de la ruta

// listen the server // iniciar el servidor
const server = app.listen(app.get('port'), () => {
  console.log('Listening on port', app.get('port'));
});

/*fin Servidor*/

const io = socket(server);//conectar el servidor con el modulo de socket io
io.on('connection', (socket) => { //recibimos la variable socket desde chat js con un id distinto por conexion
  console.log('socket connection opened:', socket.id);
  
  //escuchar el evento y recibiendo datos
  socket.on('chat:message', function(data) {
    //emitir un evento a todos
    io.sockets.emit('chat:message', data);
  });

  //escuchar evento typing
  socket.on('chat:typing', function(data) {
      //emitir a todos menos a mi con broadcast
    socket.broadcast.emit('chat:typing', data);
  });
});
