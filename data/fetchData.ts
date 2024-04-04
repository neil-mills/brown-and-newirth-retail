import axios, { AxiosError } from 'axios'
import { Product } from '@/app/types'

const fetchData = async () => {
  try {
    const res = await axios.get<Product[]>(
      'http://127.0.0.1:3000/api/products',
      { timeout: 120000 }
    )
    return res.data
  } catch (err) {
    const error = err as AxiosError
    console.log(`RESPONSE FROM API IS: ${error.message}`)
  }
}

export default fetchData
