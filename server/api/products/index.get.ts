import { products } from '../../data/products'

export default defineEventHandler((event) => {
    const query = getQuery(event)
    const category = typeof query.category === 'string' ? query.category : undefined
    const data = category
        ? products.filter((p) => p.category === category)
        : products
    return { data, total: data.length }
})
