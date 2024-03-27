'use client'
import { MutableRefObject, useEffect, useRef } from 'react'
import { Toast } from 'bootstrap'
import { useStore } from '@/app/hooks'

export const BsToast = () => {
  const toastRef = useRef<Element | string>('')
  const setToastMessage = useStore((store) => store.setToastMessage)
  const toastMessage = useStore((store) => store.toastMessage)
  useEffect(() => {
    const reset = () => {
      bsToast?.hide()
      setToastMessage('')
    }
    const toast = toastRef.current
    let bsToast = Toast.getInstance(toast)

    if (!bsToast) {
      bsToast = new Toast(toast, { autohide: false })
      ;(toastRef.current as HTMLDivElement).removeEventListener(
        'hidden.bs.toast',
        () => reset()
      )
      ;(toastRef.current as HTMLDivElement).addEventListener(
        'hidden.bs.toast',
        () => reset()
      )
      reset()
    } else {
      toastMessage ? bsToast.show() : bsToast.hide()
    }
  })

  return (
    <div
      className="toast-container"
      style={{ position: 'fixed', top: '10px', left: '10px' }}
    >
      <div
        ref={toastRef as MutableRefObject<HTMLDivElement>}
        className="toast align-items-center"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
      >
        <div className="d-flex">
          <div className="toast-body">{toastMessage}</div>
          <button
            type="button"
            className="btn-close me-2 m-auto"
            data-bs-dismiss="toast"
            aria-label="Close"
          ></button>
        </div>
      </div>
    </div>
  )
}
