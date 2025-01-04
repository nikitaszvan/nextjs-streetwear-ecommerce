'use client'
import { useRef } from 'react'
import { Provider } from 'react-redux'
import { store, AppStore } from '../lib/store'
// import { initializeCount } from '../lib/features/counter/counterSlice';

export default function StoreProvider({
  children
}: {
  children: React.ReactNode
}) {
  const storeRef = useRef<AppStore | null>(null)
  if (!storeRef.current) {
    storeRef.current = store()
    // storeRef.current.dispatch(initializeCount(count))
  }

  return <Provider store={storeRef.current}>{children}</Provider>
}