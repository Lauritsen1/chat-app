'use client'

import { useContext } from 'react'
import { DrawerContext } from '../context/DrawerProvider'

import LeftDrawer from './_components/LeftDrawer'

export default function Drawer({ children }: { children: React.ReactNode }) {
  const { leftDrawer, rightDrawer, setLeftDrawer, setRightDrawer } =
    useContext(DrawerContext)
  return (
    <div className='h-screen flex relative overflow-hidden lg:overflow-auto lg:static'>
      <div
        className={`bg-base-200 h-full w-80 absolute left-0 -z-10 transition-transform duration-300 ease-in-out lg:w-96 lg:static lg:z-0
        ${rightDrawer ? '-translate-x-80' : 'translate-x-0'}`}
      >
        <LeftDrawer />
      </div>
      <div
        className={`bg-base-100 h-full w-screen relative transition-transform duration-300 ease-in-out lg:w-full lg:static lg:translate-x-0
        ${rightDrawer ? '-translate-x-[85vw]' : ''} 
        ${leftDrawer ? 'translate-x-[85vw]' : ''}`}
      >
        {children}
        <div
          onClick={() => {
            setLeftDrawer(false)
            setRightDrawer(false)
          }}
          className={`absolute z-40 cursor-pointer inset-0 transition-colors duration-300 lg:hidden ${
            rightDrawer || leftDrawer
              ? 'bg-black/80'
              : 'bg-black/0 pointer-events-none'
          }`}
        ></div>
      </div>
      <div
        className={`bg-base-300 h-full w-80 absolute right-0 -z-10 transition-transform duration-300 ease-in-out lg:w-96 lg:static lg:z-0
        ${leftDrawer ? 'translate-x-80' : 'translate-x-0'}`}
      ></div>
    </div>
  )
}
