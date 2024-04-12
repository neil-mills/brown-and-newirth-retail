'use client'
import { useStore } from '@/app/hooks'

export const LoadingOverlay = () => {
  const isLoading = useStore((store) => store.isLoading)
  const isError = useStore((store) => store.isError)
  const error = useStore((store) => store.error)
  if (!isLoading && !isError) return null
  return (
    <div
      className="d-flex justify-content-center align-items-center bg-opacity-75"
      style={{
        width: '100vw',
        height: '100vh',
        zIndex: 1000,
      }}
    >
      {isError && (
        <>
          <svg
            className="bi flex-shrink-0 me-2"
            width="16"
            height="16"
            role="img"
            aria-label="Alert"
          >
            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z" />
          </svg>
          <span>{error}</span>
        </>
      )}
      {isLoading && !isError && (
        <>
          <div className="spinner-border spinner-border-sm" role="status">
            <span className="sr-only" style={{ display: 'none' }}>
              Loading...
            </span>
          </div>
          <p className="ms-2">Loading</p>
        </>
      )}
    </div>
  )
}
