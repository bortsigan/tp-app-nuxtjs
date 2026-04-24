import type { Product } from '~/types/product'

export const products: Product[] = [
    {
        id: 'tee-001',
        name: 'Manila Skyline Tee',
        description:
            'A tribute to the city that never sleeps — 100% ring-spun cotton, screen-printed skyline across the chest for that gritty street feel.',
        category: 'tshirt',
        sizes: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
        price: 699,
        colors: [
            { name: 'Jet Black', hex: '#0c0d11' },
            { name: 'Bone White', hex: '#f4f0e6' },
            { name: 'Press Red', hex: '#ff3d2e' },
        ],
        images: [
            'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=1200&q=80&auto=format&fit=crop',
            'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=1200&q=80&auto=format&fit=crop',
        ],
        stock: 42,
        featured: true,
        createdAt: '2026-01-04T00:00:00.000Z',
    },
    {
        id: 'tee-002',
        name: 'Barkada Vibes Tee',
        description:
            'Soft-hand screen print on heavyweight cotton. Oversized fit built for long nights, longer tambay sessions, and everything in between.',
        category: 'tshirt',
        sizes: ['s', 'm', 'l', 'xl', 'xxl'],
        price: 749,
        colors: [
            { name: 'Cement', hex: '#9ea0a9' },
            { name: 'Jet Black', hex: '#0c0d11' },
        ],
        images: [
            'https://images.unsplash.com/photo-1503341504253-dff4815485f1?w=1200&q=80&auto=format&fit=crop',
        ],
        stock: 30,
        createdAt: '2026-01-12T00:00:00.000Z',
    },
    {
        id: 'tee-003',
        name: 'Ink Drop Graphic Tee',
        description:
            'Minimalist monochrome graphic. Pre-shrunk cotton with a modern tailored cut — wear it solo or layered.',
        category: 'tshirt',
        sizes: ['xs', 's', 'm', 'l', 'xl'],
        price: 649,
        colors: [
            { name: 'Bone White', hex: '#f4f0e6' },
            { name: 'Sand', hex: '#d7c6a8' },
        ],
        images: [
            'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=1200&q=80&auto=format&fit=crop',
        ],
        stock: 55,
        featured: true,
        createdAt: '2026-02-02T00:00:00.000Z',
    },
    {
        id: 'slv-001',
        name: 'Gym Rat Sleeveless',
        description:
            'Dropped armholes, tapered sides, and an ultra-breathable knit. Built for the platform, designed for the streets.',
        category: 'sleeveless',
        sizes: ['s', 'm', 'l', 'xl', 'xxl'],
        price: 599,
        colors: [
            { name: 'Jet Black', hex: '#0c0d11' },
            { name: 'Press Red', hex: '#ff3d2e' },
            { name: 'Steel', hex: '#4f5159' },
        ],
        images: [
            'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=1200&q=80&auto=format&fit=crop',
        ],
        stock: 24,
        featured: true,
        createdAt: '2026-02-10T00:00:00.000Z',
    },
    {
        id: 'slv-002',
        name: 'Iron Press Muscle Tank',
        description:
            'Ribbed collar, dropped armholes, and moisture-wicking cotton blend. Pump cover energy, daily driver comfort.',
        category: 'sleeveless',
        sizes: ['xs', 's', 'm', 'l', 'xl'],
        price: 579,
        colors: [
            { name: 'Bone White', hex: '#f4f0e6' },
            { name: 'Jet Black', hex: '#0c0d11' },
        ],
        images: [
            'https://images.unsplash.com/photo-1622445275576-721325763afe?w=1200&q=80&auto=format&fit=crop',
        ],
        stock: 0,
        status: 'sold-out',
        createdAt: '2026-02-18T00:00:00.000Z',
    },
    {
        id: 'hd-001',
        name: 'Press Heavyweight Hoodie',
        description:
            '500 GSM brushed fleece, double-lined hood, and a drop-shoulder cut. Built to outlast trends and weather.',
        category: 'hoodie',
        sizes: ['s', 'm', 'l', 'xl', 'xxl'],
        price: 1499,
        colors: [
            { name: 'Jet Black', hex: '#0c0d11' },
            { name: 'Cement', hex: '#9ea0a9' },
            { name: 'Press Red', hex: '#ff3d2e' },
        ],
        images: [
            'https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=1200&q=80&auto=format&fit=crop',
        ],
        stock: 20,
        featured: true,
        createdAt: '2026-03-01T00:00:00.000Z',
    },
    {
        id: 'hd-002',
        name: 'Street Press Zip Hoodie',
        description:
            'Full metal zip, oversized hood, and kangaroo pockets deep enough for your entire life. Midweight fleece, year-round ready.',
        category: 'hoodie',
        sizes: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
        price: 1699,
        colors: [
            { name: 'Steel', hex: '#4f5159' },
            { name: 'Jet Black', hex: '#0c0d11' },
        ],
        images: [
            'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?w=1200&q=80&auto=format&fit=crop',
        ],
        stock: 0,
        status: 'sold-out',
        createdAt: '2026-03-11T00:00:00.000Z',
    },
    {
        id: 'hd-003',
        name: 'Pullover Classic Hoodie',
        description:
            'The one that started it all. Minimalist chest press-logo, soft-wash fleece, and a fit that just works.',
        category: 'hoodie',
        sizes: ['s', 'm', 'l', 'xl'],
        price: 1399,
        colors: [
            { name: 'Bone White', hex: '#f4f0e6' },
            { name: 'Sand', hex: '#d7c6a8' },
            { name: 'Jet Black', hex: '#0c0d11' },
        ],
        images: [
            'https://images.unsplash.com/photo-1578587018452-892bacefd3f2?w=1200&q=80&auto=format&fit=crop',
        ],
        stock: 28,
        createdAt: '2026-03-20T00:00:00.000Z',
    },
    {
        id: 'tee-004',
        name: 'Retro Press Logo Tee',
        description:
            'Vintage-wash cotton with a puff-print logo. That "found it in your tito\'s closet" energy, but cooler.',
        category: 'tshirt',
        sizes: ['s', 'm', 'l', 'xl', 'xxl'],
        price: 699,
        colors: [
            { name: 'Sand', hex: '#d7c6a8' },
            { name: 'Cement', hex: '#9ea0a9' },
        ],
        images: [
            'https://images.unsplash.com/photo-1618354691438-25bc04584c23?w=1200&q=80&auto=format&fit=crop',
        ],
        stock: 36,
        createdAt: '2026-04-01T00:00:00.000Z',
    },
    {
        id: 'hd-004',
        name: 'Neon Press Windbreaker Hoodie',
        description:
            'Water-resistant shell with a fleece-lined hood. Dropping soon — signal-red neon print that glows under black light.',
        category: 'hoodie',
        sizes: ['s', 'm', 'l', 'xl', 'xxl'],
        price: 1899,
        colors: [
            { name: 'Jet Black', hex: '#0c0d11' },
            { name: 'Press Red', hex: '#ff3d2e' },
        ],
        images: [
            'https://images.unsplash.com/photo-1618517351616-38fb9c5210c6?w=1200&q=80&auto=format&fit=crop',
        ],
        stock: 0,
        status: 'coming-soon',
        releaseDate: '2026-06-15T00:00:00.000Z',
        createdAt: '2026-04-10T00:00:00.000Z',
    },
    {
        id: 'tee-005',
        name: 'Summer Salt Beach Tee',
        description:
            'Lightweight pigment-dyed cotton with a sun-faded print. Built for sandy beaches and sunburned shoulders.',
        category: 'tshirt',
        sizes: ['xs', 's', 'm', 'l', 'xl', 'xxl'],
        price: 749,
        colors: [
            { name: 'Sand', hex: '#d7c6a8' },
            { name: 'Bone White', hex: '#f4f0e6' },
        ],
        images: [
            'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=1200&q=80&auto=format&fit=crop',
        ],
        stock: 0,
        status: 'coming-soon',
        releaseDate: '2026-05-20T00:00:00.000Z',
        createdAt: '2026-04-15T00:00:00.000Z',
    },
]
