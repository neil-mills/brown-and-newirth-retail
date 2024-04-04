import { Product } from '@/app/types'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const res = await axios.get<Product[]>(
    'https://www.brownandnewirth.com/product-data/get-products.json', /// Test data
    // 'https://staging.retailer.brownandnewirth.com/cache-data/product-data/get-products.json', // Live Data
    { timeout: 120000 }
  )
  return NextResponse.json(res.data)
}
