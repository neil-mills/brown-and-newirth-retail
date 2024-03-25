'use client'
import { useEffect } from 'react'

const InstallBootstrap = () => {
  useEffect(() => {
    // @ts-ignore
    import('bootstrap/dist/js/bootstrap.bundle.js')
  })
  return null
}

export default InstallBootstrap
