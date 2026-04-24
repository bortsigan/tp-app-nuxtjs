# The PRESS - PH

A small online store mock-up for a shirt printing brand. Built with Nuxt, Pinia, and Tailwind.

> Heads up: this is just a demo project. Products, prices, and stock are fake. No real orders go through, no payments are taken.

## What it does

You can browse shirts, tanks, and hoodies, open a product to see the details, pick a size and color, and drop items into a cart. Items that are sold out or coming soon are shown but cannot be added to the cart.

## Goal

The point of this project is to show a clean, working storefront for a local print shop, with the basics you would expect: a catalog, a product page, a cart, and a checkout screen. The backend is faked with mock data so the whole thing can run on a laptop.

## What's inside

- Home page with a hero and a product grid
- Product detail page with size, color, and quantity picks
- Cart drawer with running total
- Checkout screen (demo only, no real payment)
- Sold out and coming soon states
- Hover loupe to get a closer look at the print

## System requirements

- macOS, Linux, or Windows
- Node.js 22 (LTS)
- npm 10 or newer

If you use `nvm`, the project has a `.nvmrc` so you can just run `nvm use`.

## Installation

```bash
# clone the repo
git clone https://github.com/bortsigan/tp-app-nuxtjs
cd tp-app-nuxtjs

# pick the right node version
nvm use

# install dependencies
npm install

# start the dev server
npm run dev
```

The app will be at `http://localhost:3000`.

## Other commands

```bash
npm run build     # build for production
npm run preview   # preview the production build
npm run generate  # static build
```
# Nuxt Minimal Starter

Look at the [Nuxt documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.
