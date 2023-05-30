'use client'

import React, { createContext, useState, ReactNode } from 'react'

type DrawerContextType = {
  leftDrawer: boolean
  rightDrawer: boolean
  setLeftDrawer: (value: boolean) => void
  setRightDrawer: (value: boolean) => void
}

const initialDrawerState: DrawerContextType = {
  leftDrawer: false,
  rightDrawer: false,
  setLeftDrawer: () => {},
  setRightDrawer: () => {},
}

export const DrawerContext =
  createContext<DrawerContextType>(initialDrawerState)

type DrawerProps = {
  children: ReactNode
}

export default function DrawerProvider({ children }: DrawerProps) {
  const [leftDrawer, setLeftDrawer] = useState<boolean>(false)
  const [rightDrawer, setRightDrawer] = useState<boolean>(false)

  const drawerContextValue: DrawerContextType = {
    leftDrawer,
    rightDrawer,
    setLeftDrawer,
    setRightDrawer,
  }

  return (
    <DrawerContext.Provider value={drawerContextValue}>
      {children}
    </DrawerContext.Provider>
  )
}
