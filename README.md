## TIENES LA SIGUIENTES ARQUITECTURA 
```
product-management/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsc              # ProductList equivalent
│   │   ├── create/
│   │   │   └── page.tsx          # ProductCreate equivalent
│   │   ├── edit/
│   │   │   └── [id]/
│   │   │       └── page.tsx     # ProductEdit equivalent
│   │   ├── product/
│   │   │   └── [id]/
│   │   │       └── page.tsx      # ProductDetail equivalent
│   │   └── components/
│   │       ├── Navbar.js
│   │       └── ProductForm.js   # Shared form component
│   ├── lib/
│   │   └── api.ts           # API helper functions
│   └── styles/
│       └── globals.css
├── next.config.js
├── package.json
└── tailwind.config.js


## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```
## ejertutamos la siguiente manera 
"scripts": {
    "dev": "next dev --turbopack",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
con este comando
## npm run dev
