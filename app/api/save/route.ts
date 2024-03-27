import { NextRequest, NextResponse } from 'next/server'
import axios, { AxiosError } from 'axios'

export async function POST(request: NextRequest) {
  const body = await request.json()
  const { variationId } = body
  try {
    const res = await axios.post(
      'https://staging.retailer.brownandnewirth.com/save/',
      { variationId },
      { timeout: 4000 }
    )
    return NextResponse.json(res.data, { status: res.status })
  } catch (err) {
    const error = err as AxiosError
    return new NextResponse('Error', { status: 400 })
  }
}