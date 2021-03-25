import { io } from 'socket.io-client'
const { REACT_APP_API_URL: API_URL } = process.env

const socket = io(API_URL)

export default socket
