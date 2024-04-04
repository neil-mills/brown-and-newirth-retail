import { Product } from '@/app/types'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const chunk = request.nextUrl.searchParams.get('chunk')
  const res = await axios.get<Product[]>(
    `https://staging.retailer.brownandnewirth.com/cache-data/product-data/product-data-${chunk}.json`
  )
  return NextResponse.json(res.data)
}
