'use client'

import { useEffect, useRef, useState, useContext } from 'react'
import { DrawerContext } from '../../context/DrawerProvider'

import { useUser } from '@clerk/nextjs'

import { MessageType } from '@/app/lib/types'

import ChatBubble from '@/app/components/ChatBubble'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faBars, faUser } from '@fortawesome/free-solid-svg-icons'

import { io } from 'socket.io-client'

export default function Chat({ params }: { params: { id: string } }) {
  // User state
  const { user } = useUser()

  // Messages state
  const [currentMessage, setCurrentMessage] = useState<string>('')
  const [receivedMessages, setReceivedMessages] = useState<MessageType[]>([])

  // Room state
  const [room, setRoom] = useState<string>('')

  const messageContainerRef = useRef<HTMLDivElement>(null)
  const socket = useRef<any>(null)

  const { leftDrawer, rightDrawer, setLeftDrawer, setRightDrawer } =
    useContext(DrawerContext)

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const testMessage = {
      sender: user?.id,
      receiver: params.id,
      name: user?.username,
      content: currentMessage,
    }

    // setReceivedMessages([...receivedMessages, testMessage])
    socket.current.emit('send-message', testMessage, room)
    setCurrentMessage('')
  }

  const receiveMessage = (message: MessageType) => {
    console.log('received message', message)

    setReceivedMessages([...receivedMessages, message])
  }

  useEffect(() => {
    socket.current = io('http://localhost:3001')

    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight
    }

    if (user) {
      const roomId = [params.id, user.id].sort().join('-')
      setRoom(roomId)
      socket.current.emit('join-room', room)
    }

    socket.current.on('receive-message', receiveMessage)

    return () => {
      socket.current.emit('leave-room', room)
    }
  }, [user, room, receivedMessages])

  return (
    <main className='h-screen'>
      <div className='flex h-full flex-col justify-between bg-base-100'>
        {/* Header */}
        <div className='flex justify-between items-center gap-4 border-b border-base-content/20 p-4'>
          <button
            className='btn-ghost drawer-button btn-square btn lg:hidden'
            onClick={() => setLeftDrawer(!leftDrawer)}
          >
            <FontAwesomeIcon
              icon={faBars}
              className='text-2xl text-base-content'
            />
          </button>
          <div className='flex gap-2'>
            <div className='online avatar'>
              <div className='w-12 rounded-full'>
                <img src='https://images.unsplash.com/photo-1627087820883-7a102b79179a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' />
              </div>
            </div>
            <div className='flex flex-col justify-between text-base-content'>
              <span className='text-xl font-semibold'>Obi-Wan Kenobi</span>
              <span className='text-sm'>Jedi Knight</span>
            </div>
          </div>
          <button
            className='btn-ghost drawer-button btn-square btn lg:hidden'
            onClick={() => setRightDrawer(!rightDrawer)}
          >
            <FontAwesomeIcon
              icon={faUser}
              className='text-2xl text-base-content'
            />
          </button>
        </div>
        {/* Message container */}
        <div className='grow overflow-y-scroll p-4' ref={messageContainerRef}>
          {receivedMessages.map((receivedMessage, i) => (
            <ChatBubble key={i} message={receivedMessage} />
          ))}
        </div>
        {/* Input container */}
        <div className='border-t border-base-content/20 p-4'>
          <form onSubmit={sendMessage} className='relative'>
            <input
              value={currentMessage}
              onChange={(e) => setCurrentMessage(e.target.value)}
              type='text'
              placeholder='Type here'
              className='placeholder:text-base-focus input w-full bg-neutral pr-16 placeholder:text-neutral-content'
            />
            <button className='btn-square btn absolute bottom-0 right-0 top-0 rounded-l-none bg-primary text-primary-content'>
              <FontAwesomeIcon icon={faPaperPlane} />
            </button>
          </form>
        </div>
      </div>
    </main>
  )
}
