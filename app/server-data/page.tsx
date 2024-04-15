import fetchData from '@/data/fetchData'
import dynamic from 'next/dynamic'
import DataOutput from '@/app/components/DataOutput'
// import DataOutputWithSuspense from '@/app/components/DataOutputWithSuspense'
import { Suspense } from 'react'
import { Product } from '../types'
import { headers } from 'next/headers'
// const DataOutput = dynamic(() => import('@/app/components/DataOutput'), {
//   loading: () => <p>LOADING DATA...</p>,
// })

const ServerDataPage = async () => {
  return (
    <Suspense fallback={<p>Loading Data</p>}>
      <DataOutput />
    </Suspense>
  )
}

export default ServerDataPage
