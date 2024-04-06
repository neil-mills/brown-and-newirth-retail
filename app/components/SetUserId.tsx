'use client'
import { useSearchParams } from 'next/navigation'
import { useStore } from '@/app/hooks'
import { useEffect } from 'react'

export const SetUserId = () => {
  const searchParams = useSearchParams()
  const setUserId = useStore((store) => store.setUserId)
  const userId = searchParams.get('userId')
  useEffect(() => {
    if (userId) {
      setUserId(userId)
    }
  }, [userId, setUserId])
  return null
}
