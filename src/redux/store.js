import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client/dist/socket.io';
import rootReducer from './reducers/reducer';

let socket = io('https://gettaxiapp.herokuapp.com', { jsonp: false });
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

const store = applyMiddleware(thunk, socketIoMiddleware)(createStore)(rootReducer);

socket.on('confirm connection', () => {
	store.dispatch({ type: 'SAVE_SOCKET_ID', payload: socket.id });
});

// socket.on('found driver', (id) => {
// 	socket.join('Room' + id);
// });

export default store; 

//createStore(rootReducer, applyMiddleware(thunk, socketIoMiddleware));