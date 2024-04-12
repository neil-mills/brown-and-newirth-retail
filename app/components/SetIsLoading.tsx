'use client'
import { useEffect } from 'react'
import { useStore } from '@/app/hooks'

interface Props {
  isLoading: boolean
  isError: boolean
  error: Error | null
}

export const SetIsLoading = ({ isLoading, isError, error }: Props) => {
  const setIsLoading = useStore((store) => store.setIsLoading)
  const setError = useStore((store) => store.setError)

  useEffect(() => {
    setIsLoading(isLoading)
    setError(isError, error?.message || '')
  }, [isLoading, isError, error, setIsLoading, setError])
  return null
}
