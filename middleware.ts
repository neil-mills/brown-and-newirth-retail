import next from 'next'
import { NextRequest, NextResponse } from 'next/server'

export default function middleware(req: NextRequest) {
  const { searchParams } = req.nextUrl
  const paDiamondSet = searchParams.get('pa_diamond-set') || ''
  const [_, idParam, id] = req.nextUrl.pathname.split('/').slice(1)
  const productId = idParam === 'productId' ? id : ''
  const sku = idParam === 'sku' ? id : ''
  const response = NextResponse.next()
  response.headers.append('x-search-params', searchParams.toString())
  response.headers.append('x-search', searchParams?.get('search') || '')
  response.headers.append(
    'x-variation-id',
    searchParams?.get('variation-id') || ''
  )
  response.headers.append('x-product-id', productId)
  response.headers.append('x-pa_diamond-set', paDiamondSet)
  response.headers.append('x-sku', sku)
  return response
}
