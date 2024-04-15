import fetchData from '@/data/fetchData'
import { Product } from '../types'

const DataOutput = async () => {
  const data = await fetchData()

  return (
    <ul>
      {data.map((product, i) => {
        if (i < 5) {
          return <li key={i}>{product.name}</li>
        }
      })}
    </ul>
  )
}

export default DataOutput
