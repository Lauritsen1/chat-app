import Link from 'next/link'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGear } from '@fortawesome/free-solid-svg-icons'

export default function Chat() {
  return (
    <div className='flex flex-col h-full'>
      <div className='tabs tabs-boxed bg-transparent flex justify-center p-3'>
        <a className='tab tab-active'>Messages</a>
        <a className='tab'>Friends</a>
      </div>

      <ul className='px-4 overflow-scroll h-full'>
        {Array.from({ length: 20 }).map((_, i) => (
          <li key={i} className='p-2 rounded-lg hover:bg-base-content/20'>
            <Link href='/chat'>
              <div className='flex items-center gap-2'>
                <div className='online avatar'>
                  <div className='w-8 h-8 rounded-full'>
                    <img src='https://images.unsplash.com/photo-1627087820883-7a102b79179a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' />
                  </div>
                </div>
                <div className='flex flex-col justify-between text-base-content'>
                  <span className='text-sm font-semibold'>Obi-Wan Kenobi</span>
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
              <img src='https://images.unsplash.com/photo-1627087820883-7a102b79179a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80' />
            </div>
          </div>
          <div className='flex flex-col justify-between text-base-content'>
            <span className='text-sm font-semibold text-white'>
              Obi-Wan Kenobi
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
