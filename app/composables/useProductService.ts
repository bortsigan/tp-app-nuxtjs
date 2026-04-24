import type { Product } from '~/types/product'

export const useProductService = () => {
    const config = useRuntimeConfig()
    const base = config.public.apiBase

    return {
        list: (category?: string) =>
            $fetch<{ data: Product[]; total: number }>(`${base}/products`, {
                query: category ? { category } : undefined,
            }),
        get: (id: string) =>
            $fetch<{ data: Product }>(`${base}/products/${id}`),
        create: (payload: Omit<Product, 'id' | 'createdAt'>) =>
            $fetch<{ data: Product }>(`${base}/products`, {
                method: 'POST',
                body: payload,
            }),
        update: (id: string, payload: Partial<Product>) =>
            $fetch<{ data: Product }>(`${base}/products/${id}`, {
                method: 'PATCH',
                body: payload,
            }),
        remove: (id: string) =>
            $fetch<{ success: boolean }>(`${base}/products/${id}`, {
                method: 'DELETE',
            }),
    }
}
