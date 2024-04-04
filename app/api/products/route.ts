import { Product } from '@/app/types'
import axios, { AxiosError } from 'axios'
import { NextRequest, NextResponse } from 'next/server'
axios.defaults.timeout === 120000

export async function GET(request: NextRequest) {
  const chunk = request.nextUrl.searchParams.get('chunk')
  let products: Product[] = []
  try {
    const res = await axios.get<Product[]>(
      // 'https://www.brownandnewirth.com/product-data/get-products.json' /// Test data
      `https://staging.retailer.brownandnewirth.com/cache-data/product-data/product-data-${chunk}.json`
    )
    products = res.data
    return NextResponse.json(products)
  } catch (err) {
    const error = err as AxiosError
    console.log(`API ERROR: ${error.message}`)
  }
}
