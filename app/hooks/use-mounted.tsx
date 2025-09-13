'use client'

import { useEffect, useState, useRef } from 'react'

export function useMounted() {
  const [mounted, setMounted] = useState(false)
  const mountedRef = useRef(false)

  useEffect(() => {
    mountedRef.current = true
    setMounted(true)
    
    return () => {
      mountedRef.current = false
    }
  }, [])

  return mounted
}
