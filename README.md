# Task 5 - FocalX Dashboard

A product management dashboard built with Vite + TypeScript + React Router.

## Tech Stack
- **Vite** + **TypeScript**
- **React 18** + **React Router v6** (RouterProvider pattern)
- **No external UI libraries** — pure CSS + React

## Features
- ✅ Sign In / Sign Up with API authentication
- ✅ Protected routes (redirect to login if not authenticated)
- ✅ Products grid with hover overlay (Edit / Delete buttons)
- ✅ Search with debounce (no external libraries)
- ✅ Pagination with smart ellipsis handling (no external libraries)
- ✅ Add / Edit / Delete products with image upload
- ✅ Show product detail page with formatted dates (DD/MM/YYYY)
- ✅ Delete confirmation modal
- ✅ Fallback image on broken image URLs
- ✅ Fully responsive (tablet & desktop)
- ✅ No vertical or horizontal scroll on any page

## Project Structure
```
src/
├── components/
│   ├── DeleteModal.tsx / .css
│   ├── ImageUpload.tsx / .css
│   ├── Pagination.tsx / .css
│   ├── ProductCard.tsx / .css
│   ├── ProtectedRoute.tsx
│   └── Sidebar.tsx / .css
├── pages/
│   ├── AddItem.tsx
│   ├── Auth.css
│   ├── DashboardLayout.tsx / .css
│   ├── EditItem.tsx
│   ├── ItemForm.css
│   ├── Products.tsx / .css
│   ├── ShowItem.tsx / .css
│   ├── SignIn.tsx
│   └── SignUp.tsx
├── router/
│   └── index.tsx
├── services/
│   └── api.ts
├── types/
│   └── index.ts
├── index.css
└── main.tsx
```

## Setup & Run

```bash
npm install
npm run dev
```

## API Base URL
`https://dashboard-i552.onrender.com/api`

## Routes
| Path | Page |
|------|------|
| `/` | Sign In |
| `/signup` | Sign Up |
| `/dashboard/products` | Products List |
| `/dashboard/products/:id` | Product Detail |
| `/dashboard/products/add` | Add Product |
| `/dashboard/products/:id/edit` | Edit Product |
