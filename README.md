# 🛒 E-Commerce Frontend Project

A modern **eCommerce frontend** built using **Next.js (App Router)**, **Redux Toolkit**, **Tailwind CSS**, and real-time data from external APIs. It supports dynamic routing, image proxying (to solve CORS issues), and provides a clean, scalable structure for maintainable development.

---

## 🚀 Features

- ✅ Product & category listing from external APIs
- ✅ Product detail pages with dynamic routes
- ✅ Redux-powered cart system
- ✅ Fully responsive design
- ✅ Skeleton loading states
- ✅ Image proxy to avoid CORS issues
- ✅ Internal API proxying via Next.js
- ✅ SEO-optimized dynamic breadcrumbs
- ✅ Ready for deployment on Vercel

---

## 📦 Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **State Management:** Redux Toolkit
- **Deployment:** Vercel
- **Language:** JavaScript (no TypeScript)
- **API Proxy:** Edge Functions using Next.js routing

---

## 📁 Folder Structure

```text

## 📁 Project Structure

```text
ecommerce-project/
├── public/
│   └── images/                    # Static assets (e.g., logos, icons)
│
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── image-proxy/       # External image proxy handler
│   │   │   ├── proxy/             # Backend proxy routes
│   │   │   ├── categories/        # Categories API routes
│   │   │   ├── products/          # Products API routes
│   │   │   └── product/[slug]/    # Dynamic product API route
│   │   │
│   │   ├── cart/                  # Cart page
│   │   ├── product/[slug]/        # Product details page
│   │   ├── thankyou/              # Order confirmation page
│   │   ├── layout.js              # App layout component
│   │   ├── page.js                # Home page
│   │   └── globals.css            # Tailwind global styles
│   │
│   ├── components/
│   │   └── skeleton/              # Skeleton loaders for UI
│   │
│   ├── lib/
│   │   └── api.js                 # API client helper
│   │
│   ├── redux/
│   │   ├── store.js               # Redux store configuration
│   │   ├── ReduxProvider.js       # Redux Provider component
│   │   └── slices/
│   │       ├── cartSlice.js       # Redux slice: cart
│   │       └── productSlice.js    # Redux slice: product
│   │
│   └── utils/
│       └── helpers.js             # Reusable utility functions
│
├── tailwind.config.js             # Tailwind CSS configuration
├── next.config.mjs                # Next.js configuration
├── jsconfig.json                  # JS/TS path alias config
├── package.json                   # Project dependencies & scripts
└── README.md                      # Project documentation


```



---

## 🌐 APIs Used

| API Type         | URL                                                                |
|------------------|---------------------------------------------------------------------|
| Categories        | `http://157.230.240.97:9999/api/v1/categories`                     |
| All Products      | `http://157.230.240.97:9999/api/v1/shop/products`                  |
| Single Product    | `http://157.230.240.97:9999/api/v1/product/[slug]`                |
| Images            | `http://157.230.240.97:8888/storage/media/filename.jpg`            |

---

## 🔁 Internal API Proxy

All external API requests are proxied using the App Router under `src/app/api/proxy`:

| Local Endpoint               | Proxies External API                                      |
|-----------------------------|------------------------------------------------------------|
| `/api/proxy/categories`     | `http://157.230.240.97:9999/api/v1/categories`             |
| `/api/proxy/products`       | `http://157.230.240.97:9999/api/v1/shop/products`          |
| `/api/proxy/product/[slug]` | `http://157.230.240.97:9999/api/v1/product/[slug]`         |

---

## 🖼️ Image Proxy (CORS Fix)

All image URLs from the API are proxied through a helper API to fix CORS:

```javascript
// utils/helpers.js
export function fixImageUrl(url) {
  if (!url) return "";
  const encoded = encodeURIComponent(url.replace("http://157.230.240.97:8888", ""));
  return `/api/image-proxy?path=${encoded}`;
}


```

### ✅ Usage in JSX
Use the fixImageUrl function when rendering any product image:

```javascript
<img src={fixImageUrl(product.image)} alt={product.name} className="w-20 h-20 object-cover rounded" />
```

### 🛠️ Image Proxy API Route
Located at:

```javascript
src/app/api/image-proxy/route.js
```

This handles proxying the image:

```javascript

import { NextResponse } from "next/server";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const path = searchParams.get("path");

  if (!path) {
    return NextResponse.json({ error: "Missing path" }, { status: 400 });
  }

  const imageUrl = `http://157.230.240.97:8888${path}`;

  try {
    const response = await fetch(imageUrl);
    if (!response.ok) {
      return NextResponse.json({ error: "Failed to fetch image" }, { status: response.status });
    }

    const contentType = response.headers.get("content-type") || "image/jpeg";
    const imageBuffer = await response.arrayBuffer();

    return new NextResponse(Buffer.from(imageBuffer), {
      status: 200,
      headers: {
        "Content-Type": contentType,
      },
    });
  } catch (error) {
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

```


### ✅ Deployment on Vercel
Ready to deploy! Push your project to GitHub and:

- Go to vercel.com
- Connect your repository
- It will automatically detect the Next.js project and deploy it
- Add your custom domain (optional)

### 👤 Author
#### B M Nazmus Sakib
###### Frontend Developer

#### Made with ❤️ using Next.js App Router and Tailwind CSS