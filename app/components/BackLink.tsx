'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

export const BackLink = () => {
  const router = useRouter()
  return (
    <Link
      href="#"
      onClick={() => router.back()}
      className="mb-2 fw-300"
    >{`< Return To Previous`}</Link>
  )
}
