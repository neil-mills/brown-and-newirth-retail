import dynamic from 'next/dynamic'
import DataOutput from '@/app/components/DataOutput'
// import DataOutputWithSuspense from '@/app/components/DataOutputWithSuspense'
import { Suspense } from 'react'

// import fetchDataServer from '@/data/fetchDataServer'
// const DataOutput = dynamic(() => import('@/app/components/DataOutput'), {
//   loading: () => <p>LOADING DATA...</p>,
// })

const ServerDataPage = async () => {
  // const data = await fetchDataServer()
  return (
    <Suspense fallback={<p>Loading Data</p>}>
      <DataOutput />
    </Suspense>
  )
}

export default ServerDataPage
