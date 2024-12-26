E-commerce- Sanity-Stripe Project

This is a feature-rich e-commerce platform built using Next.js, with Stripe integration for secure payments and Sanity CMS for content management. The project is designed to deliver a seamless shopping experience while offering flexibility for managing products, collections, and orders.

Features

Next.js Framework: Ensures fast and optimized rendering with server-side rendering (SSR) and static site generation (SSG).

Stripe Payment Integration: Enables secure and efficient payment processing.

Sanity CMS: Offers a user-friendly interface for managing products, collections, and metadata.

Responsive Design: Mobile-first design with hamburger navigation and adaptable UI for various devices.

Pagination: Implements efficient product listing pagination.

Dynamic Routing: Supports routes for individual products and collections.

Installation

Prerequisites

Ensure you have the following installed on your system:

Node.js (>= 14.x)

npm or yarn

Steps

Clone the repository:

git clone https://github.com/ariaodoh/ecommerce-ss-headless.git
cd nextjs-ecommerce

Install dependencies:

npm install
# or
yarn install

Set up environment variables:
Create a .env.local file in the root directory and configure the following:

NEXT_PUBLIC_SANITY_PROJECT_ID=your_sanity_project_id
NEXT_PUBLIC_SANITY_DATASET=your_dataset_name
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key

Start the development server:

npm run dev
# or
yarn dev

Visit http://localhost:3000 to view the application.

Key Integrations

Stripe Payment Integration

Session Creation: Utilizes Stripe Checkout Sessions for handling payment transactions.

Mock Card Testing: Test payments using Stripe’s mock card numbers.

Dynamic Price Calculation: Computes total amounts dynamically based on user-selected products.

Sanity CMS Integration

Custom Schemas: Defines schemas for products, collections, and meta fields.

GROQ Queries: Fetches data from Sanity using GROQ for fast and flexible queries.

Image Management: Leverages Sanity’s image optimization features for responsive and efficient asset delivery.

Usage

Product Listing

View a paginated list of products dynamically fetched from Sanity.

Collections

Navigate to collections using dynamic routes (e.g., /collection/[slug]).

Payments

Add items to the cart and proceed to checkout via Stripe’s secure payment gateway.

Mobile Navigation

Use the responsive hamburger menu to explore products and collections on mobile devices.

Deployment

Vercel Deployment

Connect the repository to Vercel.

Add the necessary environment variables in the Vercel dashboard.

Deploy the application with automatic builds.

Contributing

Fork the repository.

Create a new branch for your feature or bug fix.

git checkout -b feature-name

Commit your changes.

Push to your fork and submit a pull request.

Testing

Use mock card numbers provided by Stripe for testing payment scenarios.

Run local testing with:

npm run test
# or
yarn test

Resources

Next.js Documentation

Sanity CMS Documentation

Stripe API Documentation

License

This project is licensed under the MIT License. See the LICENSE file for details.

