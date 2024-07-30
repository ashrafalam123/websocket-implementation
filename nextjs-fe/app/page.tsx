"use client"
import { useEffect, useState } from 'react'

function useSocket()
{
  const [socket,setSocket] = useState<null | WebSocket>(null)
  useEffect(()=> {
    const socket = new WebSocket('ws://localhost:8080')
    socket.onopen = () => {
      console.log('Connected')
      setSocket(socket)
    }
    return () => {
      socket.close()
    }
  },[])

  return  socket;
}

export default function() {
  const socket = useSocket();
  const [latestMessage,setLatestMessage] = useState("")
  const [sendMessage,setSendMessage] = useState("")
  useEffect(() => {
    if(socket){
      socket.onmessage = (message) => {
        setLatestMessage(message.data)
        console.log('Received message: ',message.data)
      }
    }
  },[socket])
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