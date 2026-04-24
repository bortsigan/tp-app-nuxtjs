export type ProductCategory = 'tshirt' | 'sleeveless' | 'hoodie' | 'sleeve'

export const SIZES = ['xs', 's', 'm', 'l', 'xl', 'xxl'] as const
export type Size = (typeof SIZES)[number]

export type ProductStatus = 'available' | 'sold-out' | 'coming-soon'

export interface ColorOption {
    name: string
    hex: string
}

export interface Product {
    id: string
    name: string
    description: string
    category: ProductCategory
    sizes: Size[]
    price: number
    colors?: ColorOption[]
    images: string[]
    stock: number
    featured?: boolean
    status?: ProductStatus
    releaseDate?: string
    createdAt: string
}

export const getProductStatus = (p: Product): ProductStatus => {
    if (p.status === 'coming-soon') return 'coming-soon'
    if (p.status === 'sold-out' || p.stock <= 0) return 'sold-out'
    return 'available'
}

export const isPurchasable = (p: Product): boolean =>
    getProductStatus(p) === 'available'

export interface CartItem {
    productId: string
    name: string
    description: string
    price: number
    image: string
    size: Size
    color?: ColorOption
    quantity: number
}

export type SortKey = 'az' | 'price-asc' | 'price-desc' | 'size-asc'
