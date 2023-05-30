'use client'

import { useEffect, useRef, useState, useContext, EventHandler } from 'react'
import { DrawerContext } from '../context/DrawerProvider'

import { Message } from '@/lib/types'

import ChatBubble from '@/components/ChatBubble'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPaperPlane, faBars, faUser } from '@fortawesome/free-solid-svg-icons'

import { io } from 'socket.io-client'
const socket = io('http://localhost:3001')

const data = [
  {
    id: 1,
    name: 'Obi-Wan Kenobi',
    content: 'You were the Chosen One!',
    time: '12:45',
    imageUrl:
      'https://images.unsplash.com/photo-1627087820883-7a102b79179a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
    isMine: false,
  },
  {
    id: 2,
    name: 'Anakin Skywalker',
    content: 'I hate you!',
    time: '12:46',
    imageUrl:
      'https://images.unsplash.com/photo-1618747946260-9511b46b1ac7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=718&q=80',
    isMine: true,
  },
]

export default function Chat() {
  const [currentMessage, setCurrentMessage] = useState<string>('')
  const [messages, setMessages] = useState<Message[]>(data)
  const messageContainerRef = useRef<HTMLDivElement>(null)

  const { leftDrawer, rightDrawer, setLeftDrawer, setRightDrawer } =
    useContext(DrawerContext)

  const sendMessage = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const message: Message = {
      id: Math.floor(Math.random() * 100),
      name: 'Obi-Wan Kenobi',
      content: currentMessage,
      time: '12:45',
      imageUrl:
        'https://images.unsplash.com/photo-1627087820883-7a102b79179a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80',
      isMine: true,
    }

    setMessages([...messages, message])
    socket.emit('send-message', message)
    setCurrentMessage('')
  }

  useEffect(() => {
    if (messageContainerRef.current) {
      messageContainerRef.current.scrollTop =
        messageContainerRef.current.scrollHeight
    }

    const receiveMessage = (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message])
    }

    socket.on('receive-message', receiveMessage)

    return () => {
      socket.off('receive-message', receiveMessage)
      socket.disconnect()
    }
  }, [])

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
          {messages.map((message) => (
            <ChatBubble key={message.id} message={message} />
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
