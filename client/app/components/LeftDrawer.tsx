import { useEffect, useState } from 'react'
import Link from 'next/link'

import { useUser } from '@clerk/nextjs'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'

interface User {
  id: string
  username: string
  imageUrl: string
}

export default function Chat() {
  const [users, setUsers] = useState<User[]>([])
  const { isLoaded, isSignedIn, user } = useUser()

  useEffect(() => {
    const apiUrl = `${window.location.origin}/api/users`

    fetch(apiUrl)
      .then((res) => res.json())
      .then((data) => setUsers(data))
  }, [])

  return (
    <div className='flex flex-col h-full'>
      <div className='tabs tabs-boxed bg-transparent flex justify-center p-3'>
        <a className='tab tab-active'>Messages</a>
        <a className='tab'>Friends</a>
      </div>

      <ul className='px-4 overflow-scroll h-full'>
        {users.map((user) => (
          <li key={user.id} className='p-2 rounded-lg hover:bg-base-content/20'>
            <Link href={`/chat/${user.id}`}>
              <div className='flex items-center gap-2'>
                <div className='online avatar'>
                  <div className='w-8 h-8 rounded-full'>
                    <img src={user.imageUrl} />
                  </div>
                </div>
                <div className='flex flex-col justify-between text-base-content'>
                  <span className='text-sm font-semibold'>{user.username}</span>
                  <span className='text-sm'>Lorem ipsum dolor sit.</span>
                </div>
              </div>
            </Link>
          </li>
        ))}
      </ul>

      <div className='p-3 flex items-center justify-between bg-neutral'>
        <div className='flex items-center gap-2 '>
          <div className='online avatar'>
            <div className='w-8 h-8 rounded-full'>
              <img src={user?.imageUrl} />
            </div>
          </div>
          <div className='flex flex-col justify-between text-base-content'>
            <span className='text-sm font-semibold text-white'>
              {user?.username}
            </span>
            <span className='text-xs'>Jedi Knight</span>
          </div>
        </div>
        <button className='btn-ghost drawer-button btn-square btn'>
          <FontAwesomeIcon
            icon={faGear}
            className='text-xl text-base-content'
          />
        </button>
      </div>
    </div>
  )
}
