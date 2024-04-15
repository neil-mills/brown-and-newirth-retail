import axios from 'axios'
import { Product } from '../types'
import fetchDataServer from '@/data/fetchDataServer'

const DataOutput = async () => {
  let data: Product[] = []
  try {
    data = await fetchDataServer()
  } catch (err) {
    console.log(err)
  }

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
