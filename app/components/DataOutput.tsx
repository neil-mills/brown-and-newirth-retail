import axios from 'axios'
import { Product } from '../types'

const DataOutput = async () => {
  const response = await axios.get<Product[]>(
    'https://staging.retailer.brownandnewirth.com/cache-data/product-data/product-data-1.json',
    { timeout: 120000 }
  )

  return (
    <ul>
      {response.data.map((product, i) => {
        if (i < 5) {
          return <li key={i}>{product.name}</li>
        }
      })}
    </ul>
  )
}

export default DataOutput
