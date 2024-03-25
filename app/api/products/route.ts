import { Product } from '@/app/types'
import axios from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  const res = await axios.get<Product[]>(
    'https://www.brownandnewirth.com/wp-json/productData/v1/data'
  )
  return NextResponse.json(res.data)
}
