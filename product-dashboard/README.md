# Product Dashboard

Product Dashboard is a React product browsing application built with Vite. It was created as a technical assessment task for demonstrating API integration, routing, filtering, and shared cart state.

## Live Demo / Screenshots

Live Demo: _Add demo URL here_

## Features

- Product grid with product images, prices, and ratings
- Search and filter by category
- Product details page via React Router
- Shopping cart with Context API and item counter
- Loading and error states
- Responsive design with Tailwind CSS

## Tech Stack

- React 18
- Vite
- React Router
- Context API
- Tailwind CSS

## Project Structure

```text
product-dashboard/
├── src/
│   ├── api/          # API request functions for products and categories
│   ├── components/   # Shared interface components such as the header
│   ├── context/      # Shared React context, including cart state
│   └── pages/        # Route-level pages such as Home and ProductDetail
├── index.html        # Application HTML entry point
├── package.json      # Dependencies and npm scripts
├── tailwind.config.js
└── vite.config.js
```

## Getting Started

1. Clone the repository:

   ```bash
   git clone <REPOSITORY_URL>
   ```

2. Change to the project directory:

   ```bash
   cd product-dashboard
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

4. Start the development server:

   ```bash
   npm run dev
   ```

5. Open `http://localhost:5173` in your browser.

## API Source

Product data is provided by [DummyJSON](https://dummyjson.com/products).

## Author

Name: _Add author name here_
