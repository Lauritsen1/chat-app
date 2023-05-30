import Image from 'next/image'

import { Message } from '../lib/types'

export default function ChatBubble(props: { message: Message }) {
  const { id, name, content, time, imageUrl, isMine } = props.message

  return (
    <div className={`chat ${isMine ? 'chat-end' : 'chat-start'}`}>
      <div className='chat-image avatar'>
        <div className='w-10 rounded-full'>
          <img src={imageUrl} />
        </div>
      </div>
      <div
        className={`chat-bubble ${
          isMine
            ? 'bg-primary text-primary-content'
            : 'bg-neutral text-neutral-content'
        }`}
      >
        {content}
      </div>
    </div>
  )
}
