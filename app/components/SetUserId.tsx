'use client'
import { useSearchParams } from 'next/navigation'
import { useStore } from '@/app/hooks'

export const SetUserId = () => {
  const searchParams = useSearchParams()
  const setUserId = useStore((store) => store.setUserId)
  const userId = searchParams.get('userId')
  if (userId) {
    setUserId(userId)
  }
  return null
}
