import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import createSocketIoMiddleware from 'redux-socket.io';
import io from 'socket.io-client/dist/socket.io';
import rootReducer from './reducers/reducer';

let socket = io('http://192.168.1.110:3000', { jsonp: false });
const socketIoMiddleware = createSocketIoMiddleware(socket, 'server/');

const store = applyMiddleware(thunk, socketIoMiddleware)(createStore)(rootReducer);

export default store; 

//createStore(rootReducer, applyMiddleware(thunk, socketIoMiddleware));