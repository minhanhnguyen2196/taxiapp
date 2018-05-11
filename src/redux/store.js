import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client/dist/socket.io';
import rootReducer from './reducers/reducer';

let socket = io('https://gettaxiapp.herokuapp.com', { jsonp: false });
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

socket.on('confirm connection', () => {
	var userCurrentData = {
		socketId: socket.id,
		phone: '0913710766'
	};
	fetch('https://gettaxiapp.herokuapp.com/api/users/' + userCurrentData.phone, 
	{
		method: 'PUT',
		headers: {
		'Content-Type': 'application/json',
		Accept: 'application/json'
	},
		body: JSON.stringify(userCurrentData)
	})
	.then(res => {
		if (res !== '') console.log('Success'); else console.log('no no');
		store.dispatch({ type: 'SAVE_SOCKET_ID', payload: socket.id });
	})
	.catch(err => console.log(err));
});

// socket.on('found driver', (id) => {
// 	socket.join('Room' + id);
// });
const store = applyMiddleware(thunk, socketIoMiddleware)(createStore)(rootReducer);

export default store; 

//createStore(rootReducer, applyMiddleware(thunk, socketIoMiddleware));