'use client'
import { useStore, filters } from '@/app/hooks'
import { useEffect } from 'react'

const ResetFilters = () => {
  const setFilters = useStore((store) => store.setFilters)
  useEffect(() => {
    setFilters(filters)
  }, [setFilters])
  return null
}

export default ResetFilters
