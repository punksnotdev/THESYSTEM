var socket = io.connect( 'http://localhost:4000' );

socket.emit( 'join', {
  foo: 'foo'
});



// var ack = document.querySelector( '.js-ack' );
// ack.addEventListener( 'click', function( event ) {
//   socket.emit( 'ack', {
//     foo: 'foo'
//   }, res => {
//     console.log( 'acknowledgement:', res )
//   });
// });
var connections = document.querySelector( '.js-connect' );


console.log(connections);

socket.on( 'join', function( event ) {
  connections.innerHTML = event.numConnections;
});
socket.on( 'connections', function( event ) {
  console.log("connections",event);
  
  connections.innerHTML = event.numConnections;
});
socket.on( 'msg', function( event ) {
  console.log( 'msg', event );
  connections.innerHTML = event.numConnections;
});
// socket.on( 'response', function( event ) {
//   console.log( 'response:', event.message );
// });
// var chat = io.connect( 'http://localhost:4000/chat' );
// chat.on( 'message', function( event ) {
//   console.log( 'chat message:', event );
// });
// var chatBtn = document.querySelector( '.js-chatBtn' );
// chatBtn.addEventListener( 'click', function( event ) {
//   chat.emit( 'message', 'Yo central, are you on the line?' );
// });