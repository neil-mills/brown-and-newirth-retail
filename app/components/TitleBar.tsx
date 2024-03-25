import { PropsWithChildren } from 'react'

export const TitleBar = ({ children }: PropsWithChildren) => {
  return (
    <div className="title-br-top bg-grey text-center text-uppercase letter-spacing text-xs mb-16px">
      {children}
    </div>
  )
}
