# React + Vite

🍕 Food Product Explorer
A modern React application for exploring nutritional information about various food products using the Open Food Facts API.

https://img.shields.io/badge/React-18.2.0-blue 
https://img.shields.io/badge/State%2520Management-Context%2520API-green
https://img.shields.io/badge/Styling-Tailwind%2520CSS-38B2AC

🌟 Live Demo
Deployed Application: https://food-sample.vercel.app/

📋 Table of Contents

Features
Tech Stack
Project Structure
Installation
Available Scripts
Usage
API Integration
State Management
Components
Deployment
Contributing

✨ Features

🔍 Product Search: Search food products by name
🏷️ Category Filtering: Filter products by food categories
📊 Nutritional Information: Detailed nutrition facts and grades
🛒 Shopping Cart: Add products to cart functionality
📱 Responsive Design: Mobile-first responsive layout
🎨 Dark Mode Support: Toggle between light and dark themes
📜 Infinite Scroll: Load more products as you scroll
🏪 Product Details: Comprehensive product information pages

🛠 Tech Stack
Frontend Framework: React 18
State Management: React Context API + useReducer
Styling: Tailwind CSS
Routing: React Router DOM
API: Open Food Facts API
Deployment: Vercel
Icons: Heroicons (SVG)

📁 Project Structure
src/
├── components/
│   ├── FilterSort.js     # Category filter and sort options
│   ├── LoadingSpinner.js # Loading indicator component
│   ├── ProductCard.js    # Product card for listing view
│   ├── ProductDetail.js  # Detailed product view
│   └── SearchBar.js      # Search functionality
├── context/
│   └── AppContext.js     # Global state management
├── hooks/
│   └── useProducts.js    # Custom hook for product operations
├── utils/
│   └── api.js           # API service functions
└── pages/
    └── Home.js          # Main homepage component

 🚀 Installation

1.Clone the repository
  git clone [(https://github.com/Sandeepit8048/Food-Sample)]
  cd Food-Sample

2.Install dependencies
  npm install

3.Start the development server
  npm start

📜 Available Scripts
npm start - Runs the app in development mode
npm run build - Builds the app for production
npm test - Launches the test runner
npm run eject - Ejects from Create React App (one-way operation)


