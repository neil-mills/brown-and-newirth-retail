import { Product } from '@/app/types'
import axios, { AxiosError } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const url = request.nextUrl.searchParams.get('url') || ''
  let products: Product[] = []
  try {
    const res = await axios.get<Product[]>(url, { timeout: 120000 })
    products = res.data
    return NextResponse.json(products)
  } catch (err) {
    const error = err as AxiosError
    console.log(`API ERROR: ${error.message}`)
    return new NextResponse(error.message, { status: error.status })
  }
}
