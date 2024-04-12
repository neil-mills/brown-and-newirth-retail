import axios, { AxiosError } from 'axios'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const res = await axios.get<string[]>(
      `https://staging.retailer.brownandnewirth.com/wp-json/productData/v1/concat?files-only=1`,
      { timeout: 120000 }
    )
    const chunkUrls = res.data
    return NextResponse.json(chunkUrls)
  } catch (err) {
    const error = err as AxiosError
    console.log(`API ERROR: ${error.message}`)
    return new NextResponse(error.message, { status: 500 })
  }
}
