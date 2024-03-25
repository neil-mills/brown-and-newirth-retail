import { useParams } from 'next/navigation'

interface Result {
  sku: string | null
  productId: string | null
}

export const useGetParams = (): Result => {
  const { slug } = useParams()
  const [idParam, id] = slug
  const productId = idParam === 'productId' ? id : null
  const sku = idParam === 'sku' ? id : null
  return { sku, productId }
}
