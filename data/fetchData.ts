import axios from 'axios'
import { Product } from '@/app/types'

const fetchData = async () => {
  const res = await axios.get<Product[]>('/api/products')
  return res.data
}

export default fetchData
