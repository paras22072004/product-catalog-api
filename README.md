# Product Catalog API

A backend API built with Node.js, Express.js, PostgreSQL (Neon), and Render.

## Features

* Browse 200,000+ products
* Category filtering
* Cursor-based pagination
* PostgreSQL indexing for fast queries
* Hosted on Render

## Tech Stack

* Node.js
* Express.js
* PostgreSQL (Neon)
* Render

## API Endpoints

### Get Products

GET /products

Example:

/products?limit=20

### Filter by Category

GET /products?category=Electronics

### Cursor Pagination

GET /products?cursorCreatedAt=<timestamp>&cursorId=<id>

## Database Design

Products table contains:

* id
* name
* category
* price
* created_at
* updated_at

Index used:

(created_at DESC, id DESC)

## Why Cursor Pagination?

Offset pagination becomes slower on large datasets and can return duplicate or missing records when new data is inserted.

Cursor pagination provides:

* Better performance
* Stable ordering
* No duplicate records across pages

## Live Demo

https://product-catalog-api-u51h.onrender.com/products

## Author

Paras
