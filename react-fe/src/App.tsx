import { useEffect, useState } from 'react'
import './App.css'
function App() {
  const [socket,setSocket] = useState<null | WebSocket>(null)
  const [latestMessage,setLatestMessage] = useState("")
  const [sendMessage,setSendMessage] = useState("")
  useEffect(()=> {
    const socket = new WebSocket('ws://localhost:8080')
    socket.onopen = () => {
      console.log('Connected')
      setSocket(socket)
    }
    socket.onmessage = (message) => {
      setLatestMessage(message.data)
      console.log('Received message: ',message.data)
    }

    return () => {
      socket.close()
    }
  },[])
  if(!socket){
    return <div>
      Connecting to socket server...
    </div>
  }
  return (
    <div>
      <div>
        <div>
        <input placeholder='Enter message to be sent' onChange={(e)=> {
          setSendMessage(e.target.value);
        }} /> 
        </div>
        <button onClick={() => {
          socket.send(sendMessage)
        }}>Send</button>
      </div>
      {latestMessage}
    </div>
  )
}

export default App
