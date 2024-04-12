import type { Metadata } from 'next'
import '@/app/globals.css'
import Head from 'next/head'
import QueryProvider from '@/lib/QueryProvider'
import { BsToast, Header, LoadingOverlay, Sidebar } from '@/app/components'

export const metadata: Metadata = {
  title: 'Brown & Newirth',
  description: 'Generated by create next app',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <>
      <html className="h-100" lang="en" suppressHydrationWarning={true}>
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <link
            rel="preload"
            href="/webfonts/hinted-Stem-Light.eot"
            as="font"
            crossOrigin="anonymous"
            type="font/eot"
          />
          <link
            rel="preload"
            href="/webfonts/hinted-Stem-Light.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/webfonts/hinted-Stem-Light.woff"
            as="font"
            crossOrigin="anonymous"
            type="font/woff"
          />
          <link
            rel="preload"
            href="/webfonts/hinted-Stem-ExtraLight.eot"
            as="font"
            crossOrigin="anonymous"
            type="font/eot"
          />
          <link
            rel="preload"
            href="/webfonts/hinted-Stem-ExtraLight.woff2"
            as="font"
            crossOrigin="anonymous"
            type="font/woff2"
          />
          <link
            rel="preload"
            href="/webfonts/hinted-Stem-ExtraLight.woff"
            as="font"
            crossOrigin="anonymous"
            type="font/woff"
          />
        </Head>
        <body className="h-100 overflow-hidden" suppressHydrationWarning={true}>
          <LoadingOverlay />
          <BsToast />
          <Header />
          <div className="wrapper d-flex">
            <Sidebar />
            <div className="inner flex-grow-1">
              <div className="row g-0 h-100">
                <QueryProvider>{children}</QueryProvider>
              </div>
            </div>
          </div>
        </body>
      </html>
    </>
  )
}
