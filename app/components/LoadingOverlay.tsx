'use client'
import { useStore } from '@/app/hooks'

export const LoadingOverlay = () => {
  const isLoading = useStore((store) => store.isLoading)
  if (!isLoading) return null
  return (
    <div
      className="d-flex justify-content-center align-items-center bg-opacity-75"
      style={{
        width: '100vw',
        height: '100vh',
        zIndex: 1000,
      }}
    >
      <div className="spinner-border" role="status">
        <span className="sr-only" style={{ display: 'none' }}>
          Loading...
        </span>
      </div>
    </div>
  )
}
