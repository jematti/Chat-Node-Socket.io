// conenction
let socket = io();

// DOM elements del html 
let message = document.getElementById('message');
let username = document.getElementById('username');
let btn = document.getElementById('send');
let output = document.getElementById('output');
let actions = document.getElementById('actions');

btn.addEventListener('click', function() {
  //enviando los parametros a traves del socket con el nombre 'chat:message'
  socket.emit('chat:message', {
    message: message.value,
    username: username.value
  });
});

//enviar un evento typing , keypress=esta tecleando
message.addEventListener('keypress', function () {
  socket.emit('chat:typing', username.value);
});

//recibir datos del servidor
socket.on('chat:message', function(data) {
  //mostrarlo mediante etiquetas de html
  actions.innerHTML = '';//borrar el evento typing previo
  output.innerHTML += `<p>
    <strong>${data.username}</strong>: ${data.message}
  </p>`
});

//escuche los datos de typing en "actions"
socket.on('chat:typing', function(data) {
  actions.innerHTML =  `<p><em>${data} is typing a message...</em></p>`
});
