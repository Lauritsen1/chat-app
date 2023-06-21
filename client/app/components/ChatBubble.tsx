import Image from 'next/image'

import { useUser } from '@clerk/nextjs'

import { MessageType } from '@/app/lib/types'

export default function ChatBubble(props: { message: MessageType }) {
  const { sender, content } = props.message

  // User state
  const { user } = useUser()

  return (
    <div className={`chat ${sender === user?.id ? 'chat-end' : 'chat-start'}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>{/* <img src={imageUrl} /> */}</div>
      </div>
      <div
        className={`chat-bubble ${
          sender === user?.id
            ? 'bg-primary text-primary-content'
            : 'bg-neutral text-neutral-content'
        }`}
      >
        {content}
      </div>
    </div>
  )
}
